﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Mobile_Login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title> <% =Resources.Lan.Title %></title>
    <link rel="stylesheet" type="text/css" href="../EasyUI/themes/metro/easyui.css" /> 
    <script type="text/javascript" src="../Js/JsBase64.js"></script>  
    <script type="text/javascript" src="../Js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="../EasyUI/jquery.easyui.mobile.js"></script>
    <style type="text/css">	   
        .mycode {
                display: inline-block;
                width: 80px;
                height: 40px;
                vertical-align: middle;
                border: solid #999999 1px;
                border-radius: 10px;
                box-shadow: #000000 inset 0px 0px 2px;
            }
        .cright{
	        z-index:500;float:right;position:absolute;right:10px;top:5px;
        }
    </style>
</head>
<body onkeydown="keyLogin();">
    <div class="easyui-navpanel" id="divMain">
				<span id="code" class="mycode"></span>
			    <a href="#" id="btnVeh" onclick="return CodeValidate(2);" class="easyui-linkbutton c6"plain="true" outline="true" style="width:150px;height:35px"><span style="font-size:16px"><% =Resources.Lan.VehLogin %></span></a> 
                <form id="cs" runat="server">
                    <asp:Button ID="btnLoginCS" Width="0" Height="0" runat="server" Text="" OnClick="btnLoginCS_Click" />
                </form>
			</div>
        <div id="mm1" style="width:150px;">
		    <div onclick="ChangeLan('zh-CN')">中文</div>
		    <div onclick="ChangeLan('en-US')">English</div>
	    </div>
	<div class="easyui-navpanel" id="p2">
	</div>
</body>
</html>

<%--<script type="text/javascript" src="../Js/com.js"></script>
<script type="text/javascript" src="../js/js.KinerCode.js"></script>
<script type="text/javascript" src="../js/AuthCode.js"></script--%>>
<!--[if IE 6]>
<script language="javascript" type="text/javascript" src="./script/ie6_png.js"></script>
<script language="javascript" type="text/javascript">
DD_belatedPNG.fix(".png");
</script>
<![endif]-->
<script type="text/javascript">
    function GoBack()
    {
        
    }
        
    function keyLogin(){
      if (event.keyCode==13)   //回车键的键值为13
         $("#btnCompany")[0].click();  //调用登录按钮的登录事件
    }
    var arrErr = new Array();
    arrErr.push({ "key": "4001","value":"<% =Resources.Lan.EnterAccountAndPassword %>"});
    arrErr.push({ "key": "4002","value":"<% =Resources.Lan.NotEnterIllegalCharacters %>"});
    arrErr.push({ "key": "4004","value":"<% =Resources.Lan.AccountNotExist %>"});
    arrErr.push({ "key": "4005","value":"<% =Resources.Lan.AccountOverdue %>"});
    arrErr.push({ "key": "4006","value":"<% =Resources.Lan.UnknownError %>"});

    function GetErr(key)
    {
        for(var i = 0; i < arrErr.length; i++)
        {
            if(arrErr[i].key == key)
            {
                return arrErr[i].value;
            }
        }
        return key;
    }

    function ChangeLan(lan)
    {
        window.location.href = 'Login.aspx?lan=' + lan;
    }
    
    function aa()
    {
        window.location.href = 'http://www.baidu.com';
    }

    function CodeValidate(doType)
    {
//        if(!c.validate())
//        {
//            alert("验证码错误！");
//            return false;
//        }
        login(doType);
        return true;
    }
    
    function login(doType){
            $("<div class=\"datagrid-mask-msg\"></div>").html("<% =Resources.Lan.Loding %>").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
		        $(".datagrid-mask").remove();  
                $(".datagrid-mask-msg").remove(); 
                OpenInfo("<% =Resources.Lan.AccountNotEnterIllegalCharacters %>");
		        $(".datagrid-mask").remove();  
                $(".datagrid-mask-msg").remove(); 
                OpenInfo("<% =Resources.Lan.PwdNotEnterIllegalCharacters %>");
//            Request = GetRequest();
//            var sOpenid = Request["openid"];
		        $(".datagrid-mask").remove();  
                $(".datagrid-mask-msg").remove(); 
                OpenInfo("<% =Resources.Lan.EnterAccountAndPassword %>");
                url: "../Ashx/Login.ashx",
                cache:false,
                type:"post",
                dataType:'json',
                data:{username:txtUserID,Pwd:txtPwd,loginDefaultType:doType},
                success:function(data){
                        if(data.result == "true")
                        {
                            SetCookie("rember",$("#chkRember")[0].checked);
                            SetCookie("userid",data.userid);
                            SetCookie("username",txtUserID);
                            SetCookie("pwd",txtPwd);
                            SetCookie("logintype",doType);
//                                delCookie("pwd");
//                            window.location.href = 'Index.aspx';
//                            OpenInfo("绑定成功！");
                            $("#btnLoginCS")[0].click();
                        }
                        else
                        {
                            OpenInfo(GetErr(data.err));
		                    $(".datagrid-mask").remove();  
                            $(".datagrid-mask-msg").remove(); 
                        }
                },
                error: function(e) { 
		            $(".datagrid-mask").remove();  
                    $(".datagrid-mask-msg").remove(); 
                    OpenInfo(e.responseText); 
                } 
            })
        
        $(document).ready(function() { 
            var sUrl=location.search.toLowerCase();
            var sQuery=sUrl.substring(sUrl.indexOf("=")+1);
            re=/select|update|delete|truncate|join|union|exec|insert|drop|count|’|"|;|>|</i;
            if(re.test(sQuery))
            {
                OpenInfo("<% =Resources.Lan.NotEnterIllegalCharacters %>");
                location.href=sUrl.replace(sQuery,"");
            }
            if(rember != undefined)
            {
                if(rember == "true")
                {
                    $("#chkRember")[0].checked = true;
                    var username = GetCookie("username");
                    if(username != undefined)
                    {
                        $("#txtUserID").textbox('setValue',username);
                    if(pwd != undefined)
		            }
                }
            }
            var sRUser = Request["rUser"];
            var sRPwd = Request["rPwd"];
        
        //防止SQL注入
       function AntiSqlValid(oField)
       {
           re= /select|update|delete|insert|exec|count|’|"|=|;|>|</i;
           if ( re.test(oField.value) )
           {
               return false;
           }
           return true;
       }
       
       function GetRequest() {  
          var url = location.search; //获取url中"?"符后的字串
           var theRequest = new Object();
           if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
                 theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
              }
           }
           return theRequest;
    }
    
    
</script>