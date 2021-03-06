
    var arrowIcon = null;
    function midArrows(points,titleRemark) {
        if (points.length < 2) return;
        try {
            arrowIcon = new GIcon();
            arrowIcon.iconSize = new GSize(24, 24);
            arrowIcon.shadowSize = new GSize(1, 1);
            arrowIcon.iconAnchor = new GPoint(12, 12);
            arrowIcon.infoWindowAnchor = new GPoint(0, 0);
            var remarkTemp = undefined;
            for (var i = points.length - 1; i < points.length; i++) {
                var p1 = points[i - 1];
                var p2 = points[i];
                var dir = bearing(p1, p2);
                var dir = Math.round(dir / 3) * 3;
                while (dir >= 360) { dir -= 360; }

                arrowIcon.image = "http://www.google.com/intl/en_ALL/mapfiles/dir_" + dir + ".png";
                remarkTemp = new GMarker(points[i], { draggable: true, icon: arrowIcon, title: titleRemark });
                map.addOverlay(remarkTemp);
            }
            return remarkTemp;
        }
        catch (e) {
            return undefined;
            //alert(e.message);
        }
    }

    function SetMidArrows(points, midArrowImage) {
        midArrowImage.setPoint(points[1]);
        for (var i = points.length - 1; i < points.length; i++) {
            var p1 = points[i - 1];
            var p2 = points[i];
            var dir = bearing(p1, p2);
            var dir = Math.round(dir / 3) * 3;
            while (dir >= 360) { dir -= 360; }

            midArrowImage.setImage("http://www.google.com/intl/en_ALL/mapfiles/dir_" + dir + ".png");
        }
        return midArrowImage;
    }

//    var bbb = false;
//    var labelT;
    function SetBaiduMidArrows(pointStart, pointEnd) {
        try {
//            if (!bbb) {
//                bbb = true;
//                labelT = new BMap.Label("imm", { position: pointStart, offset: new BMap.Size(0, 5) });
//                map.addOverlay(labelT);
//            }
            var dir = bearingBaidu(pointStart, pointEnd);
            var dir = Math.round(dir / 3) * 3;
            while (dir >= 360) { dir -= 360; }
            return "51ditu/Direction/dir_" + dir + ".png";
        }
        catch (e) {
            return "51ditu/Direction/dir_0.png";
//            alert(e.message);
        }
    }

    function bearingBaidu(from, to) {
        var pixelStart = map.pointToPixel(from);
        var pixelEnd = map.pointToPixel(to); 
//        var lat1 = from.lat;
//        var lon1 = from.lng;
//        var lat2 = to.lat;
        //        var lon2 = to.lng;
        var lat1 = pixelStart.y;
        var lon1 = pixelStart.x;
        var lat2 = pixelEnd.y;
        var lon2 = pixelEnd.x;
	if(lon2 == lon1) {
            if (lat2 < lat1) {
                angle = 0;
            }
            else {
                angle = 180;
            }
	    return angle;
        }

//        alert(Math.tan((lat2 - lat1) / (lon2 - lon1)));
//        alert(180 * (Math.atan((lat2 - lat1) / (lon2 - lon1)) / Math.PI));

        //        var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
        var angle = 0.0;
        if (Math.abs(lon2 - lon1) > 0) {
            angle = Math.atan(Math.abs((lat2 - lat1) / (lon2 - lon1)));
        }
        if (angle < 0.0)
            angle += Math.PI * 2.0;
        angle = angle * degreesPerRadian;
        angle = angle.toFixed(1);
//        alert((lat2 - lat1) + ':' + (lon2 - lon1));
        //        alert(angle);
        if (lon2 == lon1) {
            if (lat2 < lat1) {
                angle = 180;
            }
            else {
                angle = 0;
            }
        }
        else if (lon2 > lon1) {
            if (lat2 == lat1) {
                angle = 90;
            }
            else if (lat2 < lat1) {
            angle = Number(90) - Number(angle); //第一象限
            }
            else {
                angle =Number(angle) + Number(90); //第二象限
            }
        }
        else if (lon2 < lon1) {
            if (lat2 == lat1) {
                angle = 270;
            }
            else if (lat2 > lat1) {
                angle = 270 - angle; //第三象限
//                var te = angle;
//                if (labelT != undefined) {
//                    labelT.setContent(te);
//                }
            }
            else {
                angle = Number(270) + Number(angle); //第四象限
            }
        }
        return angle;
    }

    var degreesPerRadian = 180.0 / Math.PI;
    function bearing(from, to) {
        var lat1 = from.latRadians();
        var lon1 = from.lngRadians();
        var lat2 = to.latRadians();
        var lon2 = to.lngRadians();

        var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
        if (angle < 0.0)
            angle += Math.PI * 2.0;
        angle = angle * degreesPerRadian;
        angle = angle.toFixed(1);

        return angle;
    }
        
        
        
        /*
		 * x1 is the first geopoint marker point X,y1 is that Y;
		 * x2 is the second geopoint marker point X,y2 is that Y;
		 * judge and draw arrow line
		 */
	    function JudgeDrawArrow(thisMap,x1, y1, x2, y2) {
	        var arrow_height = 10; // 箭头高度  
	        var arrow_btomline = 7; // 底边的一半  
	        var x3 = 0.0;  
	        var y3 = 0.0;  
	        var x4 = 0.0;
	        var y4 = 0.0;
	        try
	        {
	        var arctangent = Math.atan(arrow_btomline / arrow_height); // 箭头角度  
	        var arrow_len = Math.sqrt(arrow_btomline * arrow_btomline + arrow_height * arrow_height); // 箭头的长度  
	        var endPoint_1 = rotateVec(x2 - x1, y2 - y1, arctangent, true, arrow_len);//此为数组
	        var endPoint_2 = rotateVec(x2 - x1, y2 - y1, -arctangent, true, arrow_len);//此为数组
	        var x_3 = x2 - endPoint_1[0]; // (x_3,y_3)是第一端点  
	        var y_3 = y2 - endPoint_1[1];  
	        var x_4 = x2 - endPoint_2[0]; // (x_4,y_4)是第二端点  
	        var y_4 = y2 - endPoint_2[1];  
	        var _X3 = x_3; 
	        var  _Y3 = y_3;  
	        var _X4 = x_4;
	        var _Y4 = y_4;
	        // 画线
	        var points = new Array();
	        points.push(new google.maps.LatLng(y1, x1));
	        points.push(new google.maps.LatLng(y2, x2));
	        //定义线的形式
	        var polyLineNow = new GPolyline(points, "#FE0202", 2);
	        thisMap.addOverlay(polyLineNow); //根据数组中的两点划线

	        // 画箭头的一半
	        points = new Array();
	        points.push(new google.maps.LatLng(y2, x2));
	        points.push(new google.maps.LatLng(_Y3, _X3));
	        //定义线的形式
	        var polyLineNow = new GPolyline(points, "#FE0202", 2);
	        thisMap.addOverlay(polyLineNow); //根据数组中的两点划线

	        // 画箭头的另一半
	        points = new Array();
	        points.push(new google.maps.LatLng(y2, x2));
	        points.push(new google.maps.LatLng(_Y4, _X4));
	        //定义线的形式
	        var polyLineNow = new GPolyline(points, "#FE0202", 2);
	        thisMap.addOverlay(polyLineNow); //根据数组中的两点划线
	    }
	    catch (e) {
	        alert(e.message);
	    } 
	    }  
	
	    function rotateVec(px, py, ang, isChlen, newLen) 
	    {
	        var rotateResult = new Array();
	        // 矢量旋转函数，参数含义分别是x分量、y分量、旋转角、是否改变长度、新长度  
	        var vx = px * Math.cos(ang) - py * Math.sin(ang);  
	        var vy = px * Math.sin(ang) + py * Math.cos(ang);  
	        if (isChlen) {  
	            var d = Math.sqrt(vx * vx + vy * vy);  
	            vx = vx / d * newLen;  
	            vy = vy / d * newLen;  
	            rotateResult.push(vx);  
	            rotateResult.push(vy);  
	        }  
	        return rotateResult;
	    }
	
	
	
	