// 将函数绑定到onload事件上，使页面加载完毕之后才执行函数
// 1.只绑定一个函数时
// window.onload = prepareGallery;

// 2.只绑定少量函数时
// window.onload = function () {
//     prepareGallery();
// };

// 3.弹性最佳方案，addLoadEvent函数，参数为：打算在页面加载完毕时执行的函数的名称
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// insertAfter函数，在现有元素后面插入一个元素
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 动态创建img元素和p元素
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    // 创建img元素节点及其属性节点
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.png");
    placeholder.setAttribute("alt", "my image gallery");
    // 创建p元素节点及其属性节点
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    // 创建文本节点
    var desctext = document.createTextNode("请选择一张图片");
    // 将文本节点插入p元素
    description.appendChild(desctext);
    // 将img元素和p元素追加到图片列表后面
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

// 遍历图片库列表，处理用户点击事件
function prepareGallery() {
    if (!document.getElementsByTagName) return false;    // 对象检测
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            // 若图片切换成功，即showPic返回true，则prepareGallery返回false，取消onclick事件的默认行为
            // 若图片切换不成功，则prepareGallery返回true，允许默认行为发生
            return !showPic(this);
        }
    }
}

// 将占位图片切换为目标图片
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName !== "IMG") return false;     // 检查placeholder元素是否存在
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";    // 检查title属性是否存在
        var description = document.getElementById("description");
        if (description.firstChild.nodeType === 3) {      // 检查description元素的第一个子元素是否是文本节点
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
