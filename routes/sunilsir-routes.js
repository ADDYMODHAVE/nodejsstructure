const router = require("express").Router();

const sunilsir = require("../controllers/sunilsir");

router.post("/get-agent", sunilsir.get_agent);
router.post("/get-ledger", sunilsir.get_ledger);
router.post("/add-sale", sunilsir.sale_add);

module.exports = router;
