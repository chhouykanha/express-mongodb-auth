const { Router } = require("express");

const router = Router()
router.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

module.exports = router
