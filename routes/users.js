var express = require('express');
var router = express.Router();
var usermodels = require("../models/usermodels")
var data1=""

usermodels.fetchallData("subcategory", function (result) {
  data1 = result
})


router.use(function(req,res,next){
  if(req.session.unm==undefined || req.session.role!='user')
  {
    console.log('invalid user pls login first')
    res.redirect('/logout')
  }
  next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userhome',{'nm':req.session.nm,'role':req.session.role});
});
router.all('/addpost', function (req, res, next) {
  if (req.method == "GET") {
    res.render("useraddpost", { "result": "", "mycat": data1 })
  }
  else {
    var myimg1 = req.files.image1
    var myimg2 = req.files.image2
    var myimg3 = req.files.image3
    var body = req.body
    var image1, image2, image3
    if (myimg1 != null) {
      image1 = randomstring.generate() + "-" + myimg1.name
      var des = path.join(__dirname, "../public/uploads", image1)
      myimg1.mv(des, function (error) {
        if (error)
          console.log(error)
      })
    } else
      image1 = "Oj186920VeVm5ea5zqfPjRWUCCEWYuQ5-empty.png	"
    if (myimg2 != null) {
      image2 = randomstring.generate() + "-" + myimg2.name
      var des = path.join(__dirname, "../public/uploads", image2)
      myimg2.mv(des, function (error) {

        if (error)
          console.log(error)

      })
    }
    else
      image2 = "Oj186920VeVm5ea5zqfPjRWUCCEWYuQ5-empty.png"
    if (myimg3 != null) {
      image3 = randomstring.generate() + "-" + myimg3.name
      var des = path.join(__dirname, "../public/uploads", image3)
      myimg3.mv(des, function (error) {

        if (error)
          console.log(error)

      })
    }
    else
      image3 = "Oj186920VeVm5ea5zqfPjRWUCCEWYuQ5-empty.png"

    usermodels.addpost(body, image1, image2, image3,req.session.regid, function (result) {
      if (result) {
        res.render("useraddpost", { "result": "posted successfully", "mycat": data1 })
      }
      else
        res.render("useraddpost", { "result": "not posted", "mycat": data1 })

    })

  }
});
router.get('/modifypost', function(req, res, next) {
  res.render('userhome',{'nm':req.session.nm,'role':req.session.role});
});

module.exports = router;
