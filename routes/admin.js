var express = require('express');
var router = express.Router();
var usermodels = require("../models/usermodels")
var path = require("path")
var randomstring = require("randomstring")
data = ""
data1 = ""
/* GET users listing. */

router.use(function (req, res, next) {
  if (req.session.unm == undefined || req.session.role != 'admin') {
    console.log('invalid admin pls login first')
    res.redirect('/logout')
  }
  next()
})
usermodels.fetchallData("category", function (result) {
  data = result
})
router.get('/', function (req, res, next) {
  res.render('adminhome', { 'nm': req.session.nm, 'role': req.session.role });
});
router.all('/addcategory', function (req, res, next) {
  if (req.method == "GET")
    res.render('addcategory', { "result": "" });
  else {
    var myimg = req.files.cat_img_nm
    var cat_nm = req.body.cat_nm
    var cat_img_nm = randomstring.generate() + "-" + myimg.name
    var des = path.join(__dirname, "../public/uploads", cat_img_nm)
    myimg.mv(des, function (error) {

      if (error)
        console.log(error)
      else {
        usermodels.addcategory(cat_nm, cat_img_nm, function (result) {
          if (result)
            res.render("addcategory", { "result": "upload successfully" })
          else
            res.render("addcategory", { "result": "upload not done" })
        })
      }
    })
  }
});
router.all('/addsubcategory', function (req, res, next) {
  if (req.method == "GET")
    res.render('addsubcategory', { "result": "", "mycat": data });
  else {
    var myimg = req.files.sub_cat_img_nm
    var cat_nm = req.body.cat_nm
    var sub_cat_nm = req.body.sub_cat_nm
    var sub_cat_img_nm = randomstring.generate() + "-" + myimg.name
    var des = path.join(__dirname, "../public/uploads", sub_cat_img_nm)
    myimg.mv(des, function (error) {

      if (error)
        console.log(error)
      else {
        usermodels.addsubcategory(cat_nm, sub_cat_nm, sub_cat_img_nm, function (result) {
          if (result)
            res.render("addsubcategory", { "result": "upload successfully", "mycat": data })
          else
            res.render("addsubcategory", { "result": "upload not done", "mycat": data })
        })
      }
    })
  }

});
router.get('/manageuser', function (req, res, next) {
  usermodels.fetchuser(function (result) {
    data1 = result
    res.render('manageuser', { "mycat": data1 });
  })

});
router.get('/deleteuser/:regid', function (req, res, next) {
  var regid = req.params.regid
  usermodels.fetchuser(function (result) {
    data1 = result
    usermodels.deleteuser(regid, data1, function (result) {
      res.redirect('/admin/manageuser')
    })
  })

});
router.get('/managepost', function (req, res, next) {
  usermodels.fetchallpost(function (result) {
    res.render('managepost', { "mycat": result });
  })

});
router.get('/deletepost/:pid', function (req, res, next) {
  var pid = req.params.pid
  usermodels.fetchallpost(function (result) {
  var  data2 = result
    usermodels.deletepost(pid, data2, function (result1) {
      res.redirect('/admin/managepost')
    })
  })

});
router.all('/changepassword', function (req, res, next) {
  if (req.method == "GET") {
    res.render("adminpassword", {'result':''})
  }
  else{
    var data = req.body
    usermodels.adminpassword(data,req.session.regid,function(result)
  {
    res.render("adminpassword", {'result':'password changed successfully....'})
  })

  }
 
});



module.exports = router;
