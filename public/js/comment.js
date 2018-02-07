//提交评论
$('#messageBtn').on('click',function(){
    $.ajax({
        url:'/addComment',
        type:"post",
        data:{
            contentid:$('#contentId').val(),
            content:$('#messageContent').val(),
        },
        success:function(data){;
            $('#messageContent').val('');
            loadCommentList(1);
        }
    });
});

//获取分页评论
$('.pagination').on('click', 'li', function(){
    var page = $(this).children().attr("data-page");
    if(page){
        loadCommentList(page)
    }
})

//每次加载时获取文章下的所有评论
function loadCommentList(page){
    var url = page ? "/commentList?page=" + page + "&" : "/commentList";
    $.ajax({
        type:'get',
        url:url,
        data:{
            contentid:$('#contentId').val()
        },
        success:function(data){
            if(data.success == true){
                loadData(data.result.commentlist, data.result.pageamount * (data.result.page-1));
                loadPage(data.result.page, data.result.totalamount, data.result.totolpage);
            }
            //renderComment();
        }
    });
}
function loadData(data, curpageamount){
    var dataHtml = "";
        for(var i = 0;i < data.length;i++){
            dataHtml += '<div class="panel panel-default messageList">'+
                '<div class="panel-body">'+
                '<div class="row">'+
                '<div class="col-xs-6"> <span style="background:#999; color:white;border-radius: 3px; padding: 3px 4px;"><span class="glyphicon glyphicon-user" style="margin-right: 3px;"></span>'+(data[i].author?data[i].author:"未知")+ '&nbsp;#' + (curpageamount+i+1) + "楼" +  '</span></div>'+
                '<div class="col-xs-6" style="text-align: right">'+data[i].createtime+
                '</div></div>'+
                '<div class="row"><div class="col-xs-12">'+
                data[i].content+'</div>'+
                '</div></div></div>';
        }
        $("#commentList").html(dataHtml);
}

function loadPage(page, totalamount, totolpage){
    var dataHtml = "";
    $(".totalCount").html('共有<span class="totalCount">' + totalamount + '</span> 条评论');
    var curPage = parseInt(page);

    if(curPage == 1){
        dataHtml += '<li class="disabled"> <a href="#" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li><li class="disabled"><a href="#">'+ curPage + '</a></li>';
    }else{
        dataHtml += '<li> <a href="#" aria-label="Previous" data-page='+ (curPage-1) +'> <span aria-hidden="true">&laquo;</span> </a> </li>';
        if(curPage == totolpage && totolpage >　2){
            dataHtml += '<li><a href="#" data-page='+ (curPage-2) +  '>' + (curPage-2) + '</a></li>';
        }else{
            dataHtml += '<li><a href="#" data-page='+ (curPage-1) +  '>' + (curPage-1) + '</a></li>';
        }
    }
    if(totolpage > 2){
        if(curPage == 1 && curPage != totolpage){
            dataHtml += '<li><a href="#" data-page='+ (curPage+1) +  '>' + (curPage+1) + '</a></li>'
        }else if(totolpage > 2 && curPage == totolpage){
            dataHtml += '<li><a href="#" data-page='+ (curPage-1) +  '>' + (curPage-1) + '</a></li>'
        }else{
            dataHtml += '<li class="disabled"><a href="#" data-page='+ curPage +  '>' + curPage + '</a></li>';
        }
    }

    if(totolpage > 2){
        if(curPage == totolpage && curPage != 1){
            dataHtml += '<li class="disabled"><a href="#" data-page='+ curPage +  '>' + curPage + '</a></li>';
        }else if(curPage != totolpage && curPage == 1){
            dataHtml += '<li><a href="#" data-page='+ (curPage+2) +  '>' + (curPage+2) + '</a></li>'
        }else {
            dataHtml += '<li><a href="#" data-page='+ (curPage+1) +  '>' + (curPage+1) + '</a></li>'
        }
    }

    if(curPage == totolpage){
        dataHtml += '<li class="disabled"> <a href="#" aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a> </li>';
    }else{
        dataHtml += '<li> <a href="#" aria-label="Next" data-page='+ (curPage+1) +  '> <span aria-hidden="true">&raquo;</span> </a> </li>';
    }
    $(".pagination").html(dataHtml);
}
//格式化日期
function formatDate(d){
    var date1=new Date(d);
    var CurrentDate = "";
   //初始化时间
    var Year= date1.getFullYear();//ie火狐下都可以
    var Month= date1.getMonth()+1;
    var Day = date1.getDate();
    var Hours = date1.getHours();
    var Minutes = date1.getMinutes();
    var Seconds = date1.getSeconds();
    CurrentDate += Year + "年";
    Month >= 10 ? (CurrentDate += Month + "月"):(CurrentDate += "0" + Month + "月");
    Day >= 10 ? (CurrentDate += Day +"日 "):(CurrentDate += "0" + Day+"日 ");
    Hours>=10 ? (CurrentDate += Hours +"："):(CurrentDate += "0"+Hours +"：");
    Minutes>=10 ? (CurrentDate += Minutes +"："):(CurrentDate += "0"+Minutes +"：");
    Seconds>=10 ? (CurrentDate += Seconds):(CurrentDate += "0"+Seconds);
    return CurrentDate;
}