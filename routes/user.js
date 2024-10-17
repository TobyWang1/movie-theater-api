const express = require('express')
const router = express.Router()
const { User, Show } = require('../models/index')
const { check, validationResult } = require('express-validator')

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/users/:id/shows', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Show })
    if (user) {
      res.json(user.Shows)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// router.post('/users/add', [
//   check('username').notEmpty().trim().withMessage('Username is required'),
//   // username must be an email
//   check('username').isEmail().withMessage('Username must be an email'),
//   check('password').notEmpty().trim().withMessage('Password is required')
// ], async (req, res) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }

//   try {
//     const user = await User.create(req.body)
//     res.json(user)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// })

router.put('/users/:id/addShow', [
  check('showId').notEmpty().trim().withMessage('Show ID is required')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findByPk(req.params.id)
    // associate the user with a show they watched
    await user.addShow(req.body.showId)
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.put('/users/:id/', [
  check('username').notEmpty().trim().withMessage('Username is required'),
  // username must be an email
  check('username').isEmail().withMessage('Username must be an email'),
  check('password').notEmpty().trim().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      await user.update(req.body)
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id)
//     if (user) {
//       await user.destroy()
//       res.json({ message: 'User deleted' })
//     } else {
//       res.status(404).json({ message: 'User not found' })
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// })

module.exports = router
