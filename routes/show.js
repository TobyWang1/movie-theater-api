const express = require('express')
const router = express.Router()
const { Show } = require('../models/index')
const { check, validationResult } = require('express-validator')

router.get('/shows', async (req, res) => {
  try {
    const shows = await Show.findAll()
    res.json(shows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/shows/genre/:genre', async (req, res) => {
  try {
    const shows = await Show.findAll({
      where: {
        genre: req.params.genre
      }
    })
    res.json(shows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/shows/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      res.json(show)
    } else {
      res.status(404).json({ message: 'Show not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// router.post('/shows/add', [
//   check('title').notEmpty().trim().withMessage('Title is required'),
//   check('genre').notEmpty().trim().withMessage('Genre is required'),
//   check('rating').notEmpty().isInt().withMessage('Rating is required'),
//   check('available').notEmpty().isBoolean().withMessage('Available is required')
// ], async (req, res) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }

//   try {
//     const show = await Show.create(req.body)
//     res.json(show)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// })

router.get('/shows/:id/users', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id, { include: 'users' })
    if (show) {
      res.json(show.users)
    } else {
      res.status(404).json({ message: 'Show not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Create a put route but only allows use to update the available field
router.put('/shows/:id/updateAvailable', [
  check('available').notEmpty().isBoolean().withMessage('Available is required and has to be a boolean value')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      await show.update({ available: req.body.available })
      res.json(show)
    } else {
      res.status(404).json({ message: 'Show not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/shows/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id)
    if (show) {
      await show.destroy()
      res.json({ message: 'Show deleted' })
    } else {
      res.status(404).json({ message: 'Show not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
