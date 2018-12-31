var con = require("./conn")
function userregister(tbl_nm, data, cb) {
    var query = "insert into " + tbl_nm + " values(NULL,'" + data.nm + "','" + data.unm + "','" + data.pass + "','" + data.address + "','" + data.city + "','" + data.mob + "','" + data.gender + "','user',0,1);"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    }
    )
}
function logincheck(tbl_nm, data, cb) {
    var query = "select * from " + tbl_nm + " where unm='" + data.unm + "'&& pass='" + data.pass + "'&&status=1;"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    }
    )


}

function loginauthentication(email, cb) {
    var query = "update registeration set status=1 where unm= '" + email + "';"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    }
    )
}
function addcategory(cat_nm, cat_img_nm, cb) {
    var query = "insert into category  values(NULL,'" + cat_nm + "','" + cat_img_nm + "');"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })
}
function addsubcategory(cat_nm, sub_cat_nm, sub_cat_img_nm, cb) {
    var query = "insert into subcategory  values(NULL,'" + cat_nm + "','" + sub_cat_nm + "','" + sub_cat_img_nm + "');"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })
}
function addpost(body, image1, image2, image3,regid, cb) {
    if(regid!=undefined){
    var query = "insert into addpost  values(NULL,'"+regid+"','" + body.title + "','" + body.cat_nm + "','" + body.description + "','" + body.price + "','" + body.email + "','" + body.mobile + "','" + body.city + "','" + body.address + "','" + image1 + "','" + image2 + "','" + image3 + "',1);"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })}
    else{
        var query = "insert into addpost  values(NULL,0,'" + body.title + "','" + body.cat_nm + "','" + body.description + "','" + body.price + "','" + body.email + "','" + body.mobile + "','" + body.city + "','" + body.address + "','" + image1 + "','" + image2 + "','" + image3 + "',1);"
        con.query(query, function (err, result) {
            if (err)
                console.log(err)
            else
                cb(result)
        })
    
    }


}


function fetchData(tbl_nm, cb) {
    var query = "select * from " + tbl_nm + " order by cat_id desc limit 0,9;"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}
function fetchallData(tbl_nm, cb) {
    var query = "select * from " + tbl_nm + " order by cat_nm"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}
function fetchsubcategory(cat_nm, cb) {
    var query = "select * from subcategory where cat_nm= '" + cat_nm + "'order by sub_cat_id desc ;"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}
function fetchpost(sub_cat_nm, cb) {
    var query = "select * from addpost where stat=1 && sub_cat_nm= '" + sub_cat_nm + "'order by pid desc ;"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}
function fetchuser(cb) {
    var query = "select * from registeration where role='user' order by adminstat desc; "
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}
function deleteuser(regid, data, cb) {
    console.log(data[0].adminstat)
    if (data[0].adminstat == 1) {
        var query = "update registeration set adminstat=0 where regid= " + regid + ";"
        con.query(query, function (err, result) {
            if (err)
                console.log(err)
            else
                cb(result)
        }
        )
    }
    else {
        var query = "update registeration set adminstat=1 where regid= " + regid + ";"
        con.query(query, function (err, result) {
            if (err)
                console.log(err)
            else
                cb(result)
        }
        )
    }
}
function fetchallpost(cb) {
    var query = "select * from addpost order by stat desc; "
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}
function deletepost(pid, data, cb) {
       if (data[0].stat == 1) {
        var query = "update addpost set stat=0 where pid= " + pid + ";"
        con.query(query, function (err, result) {
                if (err)
                console.log(err)
            else
                cb(result)
        }
        )
    }
    else {
        var query = "update addpost set stat=1 where pid= " + pid + ";"
        con.query(query, function (err, result) {
            if (err)
                console.log(err)
            else
                cb(result)
        }
        )
    }
}
function adminpassword(data,regid,cb)
{ var query = "update registeration set pass='"+data.pass+"' where regid= " + regid + ";"
con.query(query, function (err, result) {
    if (err)
        console.log(err)
    else
        cb(result)
}
)

    

}
function fetchproduct( cb) {
    var query = "select * from addpost where stat=1 order by rand() ;"
    con.query(query, function (err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })

}

module.exports = {fetchproduct:fetchproduct,deletepost:deletepost, deleteuser: deleteuser, fetchuser: fetchuser,fetchallpost: fetchallpost, fetchpost: fetchpost, logincheck: logincheck, userregister: userregister, fetchsubcategory: fetchsubcategory, loginauthentication: loginauthentication, addcategory: addcategory, addpost: addpost, fetchData: fetchData, fetchallData: fetchallData, addsubcategory: addsubcategory ,adminpassword:adminpassword}