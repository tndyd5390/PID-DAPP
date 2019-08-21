/*******************************************************************************
 * COMMON JAVASCRIPT DEV ( 2015-04-08 )
 ******************************************************************************/
//$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
$(document).ready(function() {

	/*****************************************************************************
	 * numPhn을 class를 이용한 숫자체크 사용법 : 태그 class 에 numPhn를 추가해준다. 단, 입력태그만 가능 (text,
	 * input) even KeyCode 추가 빽스페이스와 탭 은 허용(20150422)
	 ****************************************************************************/
	$(".numPhn").keyup(function(e) {

		if ( e.keyCode == "8" || e.keyCode == "9" ) {
		} else {
			if ( !$.numberChk($(this).val()) ) {

				$(this).val("");
				alert("숫자만 가능합니다.");
				$(this).val("");
				return false;
			}
		}

		return true;
	});
	
	/*****************************************************************************
	 * numDot을 class를 이용한 숫자체크 사용법 : 태그 class 에 numPhn를 추가해준다. 단, 입력태그만 가능 (text,
	 * input)
	 ****************************************************************************/
	$(".numDot").keyup(function() {

		if ( !$.numberdot($(this).val()) ) {
			$(this).val("");
			alert("숫자 및 점(.)만 가능합니다.");
			$(this).val("");
			return false;
		}
		return true;
	});

	
	/*******************************************************************************
	 * 실수만 허용 : class 에 "number_float" 를 넣어준다.
	 ******************************************************************************/
	//only 실수만 가능한 input common util
 	$('.number_float').keypress(function(event){
 		//alert("event. ==>  " + event.keyCode);
		if($.browser.mozilla == true){
			if (event.which == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 16 || event.keyCode == 46){
				return true;
			}
		}
		if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
		
	});
	//한글 체크까지 동시에 한다.
 	$('.number_float').keyup(function(event){
 		//alert("event ==> " + $(this).val());
 		var val = $(this).val();
 		$(this).val(val.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
	});
 	
 	//한글 막음
 	$('.noKorean').keyup(function(event){
 		//alert("event ==> " + $(this).val());
 		var val = $(this).val();
 		$(this).val(val.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''));
 		/*if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
        }*/
	});
 	/*******************************************************************************
	 * 달력 팝업용 function
	 ******************************************************************************/
 	$(document).on("click",'.calendar_pop', function(){
		//var idx = $('.calendar').index( this );
		calIndex = $('.calendar_pop').index( this );
		//alert(calIndex);
		$('.calendarLayer').hide();
		$("#overlay_t").show();
		$('.calendarLayer').eq(0).show();
		$(".calendarLayer").css( { left : ( $(window).width() -$(".calendarLayer").filter(":visible").width() ) *.5, top : ( $(window).height() - $(".calendarLayer").filter(":visible").height() )* .5 } );
		//resizeLayerPop_calendar();
 	})
	
});

function resizeLayerPop_calendar()
{
	
}

function fn_calendar_pop(obj) {
	//var idx = $('.calendar').index( this );
	//calIndex = $('.calendar_pop').index( this );
	//calIndex = $('[name=calendarButton]').index( this );
	//calIndex = $('#calendarButton1').index( this );
	//calIndex = $(obj).index( this );
	calIndex = -1;
	calthis =  obj;
	//alert(calIndex);
	$('.calendarLayer').hide();
	$("#overlay_t").show();
	$('.calendarLayer').eq(0).show();
	resizeLayerPop_calendar();
}


/*******************************************************************************
 * 최대 글자 체크 사용법 : maxValueChk (this, 최대값)
 ******************************************************************************/
function maxValueChk(inputthis, maxnum) {

	var inputLen = inputthis.value.length;
	if ( inputLen > maxnum ) {
		alert("최대 " + maxnum + "글자 까지 입력가능합니다.\n다시 입력해 주십시오.");
		inputthis.value="";
		inputthis.focus();
		return (false);
	}

	return (true);
}

/*******************************************************************************
 * 최대 글자 체크 사용법 : maxValueChk2 (this, 최대값)
 * 최대값으로 잘라서 리턴 
 ******************************************************************************/
function maxValueChk2(inputthis, maxnum) {

	var inputLen = inputthis.value.length;
	if ( inputLen > maxnum ) {
		alert("최대 " + maxnum + "글자 까지 입력가능합니다.\n"+maxnum+"글자로 변경합니다.");
		inputthis.value=inputthis.value.substring(0,maxnum );
		inputthis.focus();
	}

	return (true);
}


/*******************************************************************************
 * 숫자 체크 사용법 : 파라미터 해당 input ID를 String 형태로 넣는다.
 ******************************************************************************/
function numberChk(inputId) {

	var input = document.getElementById(inputId);

	if ( !$.numberChk(input.valeu) ) {
		document.getElementById(inputId).value = "";
		alert("숫자만 가능합니다.");
		return false;
	}
	return true;
}

/*******************************************************************************
 * 연락처 포멧 사용법 : id1,id2,id3에 해당 input id를 string 형태로 넣는다. EX) if(
 * !telChk('telNum1', 'telNum2', 'telNum3' ) ){ return; }
 ******************************************************************************/
function telChk(id1, id2, id3) {

	var tel1 = document.getElementById(id1);
	var tel2 = document.getElementById(id2);
	var tel3 = document.getElementById(id3);

	var tel1v = tel1.value;
	var tel2v = tel2.value;
	var tel3v = tel3.value;

	if ( tel1v == "" || tel2v == "" || tel3v == "" ) {
		alert("연락처를 확인해 주십시오. ");
		tel1.focus();

		return (false);

	} else {

		if ( !(tel2v.length == 3 || tel2v.length == 4) ) {
			alert("연락처 가운데 자릿수를 확인해 주십시오.");
			tel2.focus();
			return (false);
		}

		if ( tel3v.length != 4 ) {
			alert("연락처 마지막 자릿수를 확인해 주십시오.");
			tel3.focus();
			return (false);
		}
	}

	return (true);
}

/*******************************************************************************
 * 문자열의 양쪽(왼쪽, 오른쪽) 공백 제거 함수 사용법: 파라미터를 stirng 형태로 넘긴다. EX) trimIt('abc'); or
 * trimIt($("A").val());
 ******************************************************************************/
function trimIt(src) {

	var search = 0;

	while (src.charAt(search) == " ") {
		search = search + 1;
	}

	src = src.substring(search, (src.length))

	search = src.length - 1;

	while (src.charAt(search) == " ") {
		search = search - 1;
	}

	return src.substring(0, search + 1);
}

/*******************************************************************************
 * 첨부파일의 이름을 가져오는 함수 사용법: 파라미터를 stirng 형태로 넘긴다. EX) getFileName('abc') or
 * getFileName($("aa").val())
 ******************************************************************************/
function getFileName(realPath) {

	var path = realPath.split("\\");
	var fileName = path[path.length - 1];

	return fileName;

}

/*******************************************************************************
 * 첨부파일의 확장자 호출
 ******************************************************************************/
function exeName(fname) {

	var arr = ("file:///" + fname.replace(/ /gi, "%20").replace(/\\/gi, "/")).split("/");
	var s = arr[arr.length - 1];
	var arr2 = s.split(".");
	return arr2[arr2.length - 1];
}

/*******************************************************************************
 * 첨부파일의 확장자 체크 확장자 포함여부확인 type : I(이미지)/S(문서)/P(pdf)/A(jpg,png,pdf) str : 확장자
 ******************************************************************************/
function includeCheck(type, str) {

	var a = "jpg:JPG:png:PNG";
	
	if ( type == "S" ) {
		a = "xlsx:XLSX";
	} else if ( type == "P" ) {
		a = "pdf:PDF";
	}else if( type=="A"){
		a = "jpg:JPG:png:PNG:pdf:PDF";
	}else if( type=="I"){
		a = "jpg:JPG";
	}
		
		tmp = a.split(":");

	for (var i = 0; i < tmp.length; i++) {

		if ( tmp[i] == str ) {
			return true;
		}
	}

	return false;
}