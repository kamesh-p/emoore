let mongoose = require('mongoose'),
 express = require('express'),
 bookRouter = express.Router()

 let bookSchema = require('../Models/books_schema')

 bookRouter.route('/create-user').post((req, res, next) => {
    bookSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log(data)
        res.json(data)
      }
    })
  })

 

  bookRouter.route('/').get((req, res) => {
    bookSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  bookRouter.route('/get-user/:id').get((req, res) => {
    bookSchema.findById(req.params.id, (error, data) => {
  
      // const {username,password} = res.body;
      // if (!username || !password) {
      //     return res.status(422).json({error:"plzzz fill"})
      
      //   }else{
  
      // const userlog = User.findOne({name:name});
      //     console.log(userlog);
      //   }

      if (error) {
        return next(error)

      } else {
        res.json(data)
      }
    })
  })

  
  bookRouter.route('/update-user/:id').put((req, res, next) => {
    bookSchema.findByIdAndUpdate(
    
      req.params.id,
      {
        $set: req.body,
      },

      (error, data) => {
        if (error) {
          return next(error)
          
        } else {
          res.json(data)
          console.log('user updated successfully !')
        }
      },
    )
  })

  bookRouter.route('/delete-user/:id').delete((req, res, next) => {
    bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.status(200).json({
          msg: data,
        })
      }
    })
  })

  module.exports = bookRouter;



