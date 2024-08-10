document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;

    if (currentUrl.includes('/index.html') || currentUrl.includes('/')) {

        //主页主题------------------------------------------------------------------------------
        console.log('应用主页主题');
        let style = document.createElement("style");
        style.innerHTML = `

        /* 主体布局 */
        body {
            margin: 30px auto;
            padding: 20px;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: rgba(255, 255, 255, 0.8); /* 白色背景，透明度80% */
            border-radius: 10px; /* 圆角边框 */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
            overflow: auto;
        }

        /* 主页博客列表圆角边框 */
        .SideNav {
            background: rgba(255, 255, 255, 0.6); /* 白色背景，透明度60% */
            border-radius: 10px; /* 圆角边框 */
            min-width: unset;
        }

        /* 鼠标放到博客标题后会高亮 */
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.04);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }

        .SideNav-item {
            transition: 0.25s;
        }

        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        `;
        document.head.appendChild(style);


    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {

        //文章页主题------------------------------------------------------------------------------
        console.log('文章页主题');

    let style = document.createElement("style");
    style.innerHTML = `

    /* 主体布局 */
    body {
        min-width: 200px;
        max-width: 1100px;
        margin: 30px auto;
        font-size: 16px;
        font-family: sans-serif;
        line-height: 1.25;
        background: rgba(255, 255, 255, 0.85); /* 白色背景，透明度85% */
        border-radius: 10px; /* 圆角边框 */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
        overflow: auto;
    }

    @media (min-width: 1001px) {
    body {
        padding: 45px;
    }
    }

    @media (max-width: 1000px) {
    body {
        padding: 20px;
    }
    }


    /* markdown内容 */
    .markdown-body img {
        border-radius: 10px;
        border: 2px solid #a3e0e4;
    }

    .markdown-alert {
        border-radius: 10px;
    }

    .markdown-body .highlight pre, .markdown-body pre {
        color: #1d211f;
        background-color: #f1f3f5;
        box-shadow: 0 10px 30px 0 rgba(180, 174, 174, 0.4);
        padding-top: 20px;
        border-radius: 10px;
    }

    .markdown-body code, .markdown-body tt {
        background-color: rgb(141 150 161 / 20%);
    }

    /*行内代码*/
    .notranslate {
        font-size: 16px;   /*默认.9rem*/
        word-wrap: break-word;
        padding: 2px 4px;
        border-radius: 4px;
        margin: 0 2px;
        color:  rgb(239, 112, 96);;
        background-color: rgba(27,31,35,.05);
        font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
        word-break: break-all;
    }

    /* 标题 */
    .markdown-body h1 {
        font-size: 1.3rem;
        border-bottom: 3px solid rgb(239, 112, 96);
    }

    /* 大标题之间隔开一个空行距离 */
    .markdown-body h1::before {
        content: "\A";
        white-space: pre; 
    }

    /* 小标题之间隔开一个空行距离 */
    /* .markdown-body h2::before,
    .markdown-body h3::before,
    .markdown-body h4::before,
    .markdown-body h5::before,
    .markdown-body h6::before {
        content: "\A";        
        white-space: pre;       
        display: block;         
    } */
    `;
        document.head.appendChild(style);

    
    } else if (currentUrl.includes('/tag')) {

        // 搜索页主题--------------------------------------------------------------------
        console.log('应用搜索页主题');
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        
        .title-right {
            align-items: flex-end;
        }
    
        @media (max-width: 600px) {
            .tagTitle {
                display: unset;
                font-size: 14px;
                white-space: unset;
            }
        }
        
        
        /* 背景图片 */
        html {
            background: url('https://img.liyifan.xyz/file/a2262c314f6a8bd592eba.jpg') no-repeat center center fixed;
            background-size: cover;
        }
        
        /* 主体布局 */
        body {
            margin: 30px auto;
            padding: 20px;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: rgba(255, 255, 255, 0.8); /* 白色背景，透明度80% */
            border-radius: 10px; /* 圆角边框 */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
            overflow: auto;
        }
        
        .SideNav {
            background: rgba(255, 255, 255, 0.6); /* 白色背景，透明度60% */
            border-radius: 10px; /* 圆角边框 */
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: #3cd2cd;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: unset; 
            height: 36px;
        }
        `;
        document.head.appendChild(style);
    
    } else {
        console.log('未应用主题');
    }
})
