const connectToDb = require("../db");

const common = require("../helper/common");

exports.get_agent = async (req, res) => {
  try {
    const { mobile_no, state, district, agent_name, autofill } = req.body;
    console.log(autofill);
    const pool = await connectToDb();
    if (autofill) {
      const agentExist = await pool.query(
        `
        SELECT * FROM Agent WHERE ContactNumber LIKE ?
      `,
        [`${mobile_no}`]
      );

      if (agentExist.length > 0) {
        return res.status(200).json(common.response("Agent Exits", 1, agentExist[0]));
      }
      return res.status(200).json(common.response("Autofill not found", 0, {}));
    } else {
      const createAgent = await pool.query(
        `INSERT INTO Agent (
          AgentName,
          State,
          District,
          ContactNumber
        ) VALUES (?, ?, ?, ?)`,
        [agent_name, state, district, mobile_no]
      );
      const agentId = Number(createAgent.insertId);

      return res.status(200).json(common.response("Agent Created", 1, { agentId }));
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.get_ledger = async (req, res) => {
  try {
    const { ledger_name, address, pin_code, contact_person, ledger_mobileno, fac_type, ledger_district, ledger_state, autofill } = req.body;

    const pool = await connectToDb();

    if (autofill) {
      const ledgerExist = await pool.query(
        `
      SELECT * FROM Ledger WHERE MobileNumber LIKE ?
    `,
        [`${ledger_mobileno}`]
      );
      console.log(ledgerExist);
      if (ledgerExist.length > 0) {
        return res.status(200).json(common.response("Ledger Exists", 1, ledgerExist[0]));
      }
      return res.status(200).json(common.response("Autofill not found", 0, {}));
    } else {
      const createLedger = await pool.query(
        `INSERT INTO Ledger (
      LedgerName,
      Address,
      Pincode,
      ContactPerson,
      MobileNumber,
      Type,
      District,
      State
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [ledger_name, address, pin_code, contact_person, ledger_mobileno, fac_type, ledger_district, ledger_state]
      );
      const agentId = Number(createLedger.insertId);
      return res.status(200).json(common.response("Ledger Created", 1, { agentId }));
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.sale_add = async (req, res) => {
  try {
    const { ledger_id, agent_id, sale_date, visits, pob, secondary_sale } = req.body;

    const pool = await connectToDb();
    await pool.query(
      `INSERT INTO Sales (
        LedgerID,
        AgentID,
        SaleDate,
        Visits,
        POB,
        SecondarySale
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [ledger_id, agent_id, sale_date, visits || 0, pob, secondary_sale || 0.0]
    );

    return res.status(200).json(common.response("Sale Added", 1, {}));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
