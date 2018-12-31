var express = require('express');
var usermodels = require("../models/usermodels")
var mymail = require("../models/mymail")
var router = express.Router();
var path = require("path")
var randomstring = require("randomstring")
var md5 =require("md5")
var encryptionhelper=require("encryptionhelper")
var data, data1
usermodels.fetchallData("category", function (result) {
  data = result
})
usermodels.fetchallData("subcategory", function (result) {
  data1 = result
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { "mycat": data })

});

router.get('/about', function (req, res, next) {
  var unm=encryptionhelper.cipher('my-pet-is-xyz','admin','aes256')
  var pass=encryptionhelper.cipher('my-pet-is-xyz','admin@123','aes256')
  res.cookie('unm',unm)
  res.cookie('pass',pass)  
  
  var nunm=encryptionhelper.decipher('my-pet-is-xyz',req.cookies.unm)
  var npass=encryptionhelper.decipher('my-pet-is-xyz',req.cookies.pass)
  
  //res.clearCookie(unm)
  
  console.log('username :',nunm,' password :',npass)


  //var dec=encryptionhelper.decipher('my-pet-is-xyz',enc)

  res.render('about');
});
router.get('/contact', function (req, res, next) {
  res.render('contact');
});
router.get('/service', function (req, res, next) {
  res.render('service');
});

router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/login')
});

router.all('/userauthentication/:emailid', function (req, res, next) {
  var email = req.params.emailid
  usermodels.loginauthentication(email, function (result) {
    if (result)
      res.redirect("/login")
    else
      res.redirect("/register")
  })
});

router.all('/login', function (req, res, next) {
  var u=req.cookies.unm
  var p=req.cookies.pass
  if(u==undefined)
    u=''
  if(p==undefined)
    p=''  

  if (req.method == "GET") {
    res.render("login", {'result':'','u':u,'p':p})
  }
  else {
    var data = req.body
    usermodels.logincheck("registeration", data, function (result) {
      if (result.length == 0)
        res.render("login", { "result": "invalid user",'u':u,'p':p })
      else {
        if(data.chk!=undefined)
        {
          res.cookie('unm',data.unm)
          res.cookie('pass',data.pass)
        }
       
        req.session.unm=result[0].unm
        req.session.nm=result[0].nm
        req.session.role=result[0].role
        req.session.regid=result[0].regid
        if (result[0].role == "admin")
          res.redirect("/admin")
        else
          res.redirect("/users")
      }
    })
  }

});

router.all("/register", function (req, res, next) {
  if (req.method == "GET") {
    res.render("register", { "result": "" })
  }
  else {
    var data = req.body
    usermodels.userregister("registeration", data, function (result) {
      if (result) {
        mymail.sendmail(data.unm, data.pass, function (result) {
          if (result) {
            res.render("register", { "result": "user registered succesfully...." })
          }
          else
            res.render("register", { "result": "user registeration failed...." })
        })
      }

      else
        res.render("register", { "result": "user registeration failed...." })
    })
  }
})
router.get('/subcategories/:cat_nm', function (req, res, next) {
  var cat_nm = req.params.cat_nm
  usermodels.fetchsubcategory(cat_nm, function (result) {
    res.render('subcategories', { "mycat": result, "mycat1": data });
  })
});

router.all('/addpost', function (req, res, next) {
  if (req.method == "GET") {
    res.render("addpost", { "result": "", "mycat": data1 })
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

    usermodels.addpost(body, image1, image2, image3, req.session.regid,function (result) {
      if (result) {
        res.render("addpost", { "result": "posted successfully", "mycat": data1 })
      }
      else
        res.render("addpost", { "result": "not posted", "mycat": data1 })

    })

  }
});
router.get('/showpost/:sub_cat_nm', function (req, res, next) {
  var sub_cat_nm = req.params.sub_cat_nm
  usermodels.fetchpost(sub_cat_nm, function (result) {
    res.render('showpost', { "mycat": result, "mycat1": data });

  })
});
router.get('/product', function (req, res, next) {
  usermodels.fetchproduct( function (result) {
    res.render('showproduct', { "mycat": result, "mycat1": data });

  })
});


module.exports = router;