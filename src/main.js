const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "C", url: "https://css-tricks.com" },
  { logo: "W", url: "https://www.w3schools.com" },
  { logo: "B", url: "https://www.bilibili.com" }
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/,''); // 删除以 ’/‘ 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    console.log(index)
    const $li = $(`<li>   
    <div class="site" id="touchArea">
      <div class="logo">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class='close'>
        <svg class="icon" >
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>    
  </li>`).insertBefore($lastLi);
  $li.on('click',()=>{ // 点击 li ，跳转到 url
    window.open(node.url,"_self")
  })
  $li.on('click','.close',(e)=>{  // 点击 .close 区域，阻止冒泡（窗口跳转）
    e.stopPropagation() //阻止冒泡
    hashMap.splice(index,1) //在 hashMap 内删掉 此条数据
    render() //然后重新渲染页面
  })
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址：");
  if (url.indexOf("http") === -1) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(),  url: url });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); // localStorage 只能存字符串，所以先将对象转化字符串
  window.localStorage.setItem("x", string);
};

 //监听屏幕长按，显示删除按钮
let timeOutEvent = 0
$(function(){
  $("#touchArea").on({
    touchstart:function(e){
      timeOutEvent = setTimeout(longPress(),500)
      e.preventDefault();
    },
    touchmove: function(){
      clearTimeout(timeOutEvent)
      timeOutEvent = 0;
    },
    touchend:function(){
      clearTimeout(timeOutEvent)
    }
  })
  if(timeOutEvent>=500){
    $(".siteList .site .close").css({"visibility":"visible"})
  }
})


//键盘监听
$(document).on('keypress',(e)=>{
  const {key} = e  // 即 const key = e.key
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()=== key){
      window.open(hashMap[i].url,"_self")
    }
  }
})