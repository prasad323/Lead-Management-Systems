const db = require('../db/db');

exports.createLead = async (req, res) => {
    try {
        const { name, email, phone, budget, location, source, property_type, notes } = req.body;

        if (!name || !phone) {
            return res.status(400).send({
                success: false,
                message: "Name and phone are required"
            });
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).send({
                success: false,
                message: "Invalid phone number"
            });
        }

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid email format"
                });
            }
        }

        const checkDuplicate = await db.query(
            `SELECT * FROM leads WHERE name = $1 AND phone = $2`,
            [name, phone]
        );

        if (checkDuplicate.rows.length > 0) {
            return res.status(409).send({
                success: false,
                message: "Lead with same name and phone already exists"
            });
        }

        const result = await db.query(
            `INSERT INTO leads (name, email, phone, budget, location, source, property_type, notes) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, email, phone, budget, location, source, property_type, notes]
        );

        res.status(201).send({
            success: true,
            message: 'Lead created successfully',
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error creating lead:', error);

        if (error.code === "23505") {
            return res.status(409).send({
                success: false,
                message: "Duplicate lead (name + phone already exists)"
            });
        }

        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.getLeads = async (req, res) => {
  try {
    const { search, source, status, sort, page = 1, limit = 5 } = req.query;

    let query = `SELECT * FROM leads WHERE 1=1`;
    let countQuery = `SELECT COUNT(*) FROM leads WHERE 1=1`;
    let values = [];

    if (search) {
      values.push(`%${search}%`);
      query += ` AND (name ILIKE $${values.length} OR phone ILIKE $${values.length})`;
      countQuery += ` AND (name ILIKE $${values.length} OR phone ILIKE $${values.length})`;
    }

    if (source) {
      values.push(source);
      query += ` AND source = $${values.length}`;
      countQuery += ` AND source = $${values.length}`;
    }

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
      countQuery += ` AND status = $${values.length}`;
    }

    if (sort === "budget") {
      query += ` ORDER BY budget DESC`;
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const offset = (page - 1) * limit;

    values.push(limit);
    values.push(offset);

    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await db.query(query, values);
    const totalResult = await db.query(countQuery, values.slice(0, values.length - 2));

    return res.status(200).send({
      success: true,
      data: result.rows,
      total: parseInt(totalResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(totalResult.rows[0].count / limit)
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

exports.getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM leads WHERE id = $1', [id]);
        res.status(200).send({
            success: true,
            messages: 'Leads retrieved successfully',
            data: result.rows
        })
    } catch (error) {
        console.error('Error fetching lead by ID:', error);
        res.status(500).send({
            success: false,
            messages: 'Lead retrieved Unsuccessfully',
            error: error.messages
        })
    }
}

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const result = await db.query('UPDATE leads SET status = $1, notes = $2 WHERE id = $3 RETURNING *', [status, notes, id]);
        res.status(200).send({
            success: true,
            messages: 'Lead updated successfully',
            data: result.rows[0]
        })
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).send({

            success: false,
            messages: 'Lead updated Unsuccessfully',
            error: error.messages
        })
    }
}

exports.getDashboard = async (req, res) => {
    try {
        const total = await db.query('SELECT COUNT(*) FROM leads');

        const bySource = await db.query(`
      SELECT source, COUNT(*) FROM leads GROUP BY source
    `);

        const byStatus = await db.query(`
      SELECT status, COUNT(*) FROM leads GROUP BY status
    `);

        res.send({
            total: total.rows[0].count,
            bySource: bySource.rows,
            byStatus: byStatus.rows,
        });

    } catch (error) {
        console.error('Error fetching dashboard:', error);
        res.status(500).send({ success: false });
    }
};
