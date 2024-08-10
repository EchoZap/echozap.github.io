document.addEventListener('DOMContentLoaded', function() {    
    let currentUrl = window.location.pathname;


    //主页主题------------------------------------------------------------------------------
    
    if (currentUrl.includes('/index.html') || currentUrl.includes('/')) {
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
        document.head.appendChild(style);}


    //文章页主题------------------------------------------------------------------------------
    
    else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('文章页主题');

        // 加载Clipboard.js库
        let clipboardScript = document.createElement('script');
        clipboardScript.type = 'text/javascript';
        clipboardScript.src = 'https://cdn.jsdelivr.net/gh/EchoZap/echozap.github.io@main/static/plugins/clipboard.min.js';
        document.body.appendChild(clipboardScript);

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


        /* 复制按钮----------------------------------------- */
        .markdown-body .highlight pre, .markdown-body pre {
            position: relative;
        }

        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #ffffff; 
            border: 1px solid #ddd; 
            cursor: pointer;
            border-radius: 5px; 
            display: flex;
            align-items: center;
        }

        pre.notranslate .copy-button:hover {
            background-color: #f5f5f5; 
        }

        pre.notranslate .copied {
            border: 1px solid #008000; 
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 12px;
            border-radius: 5px; 
            display: flex;
            align-items: center;
        }

        pre.notranslate .copied svg {
            color: #008000; 
        }

        `;
        document.head.appendChild(style);
        
        // 复制按钮
        clipboardScript.onload = function() {
            // 获取所有代码块
            var codeBlocks = document.querySelectorAll('pre.notranslate');
    
            // 遍历
            codeBlocks.forEach((codeBlock) => {
                // 创建复制按钮
                var copyButton = createCopyButton();
    
                codeBlock.appendChild(copyButton);
    
                // 初始化Clipboard.js
                var clipboard = new ClipboardJS(copyButton, {
                    target: function(trigger) {
                        return codeBlock;
                    }
                });
    
                // 监听成功事件
                clipboard.on('success', function(e) {
                    handleCopySuccess(copyButton);
                    e.clearSelection();
                });
    
                // 监听代码块滚动事件
                codeBlock.addEventListener('scroll', function() {
                    adjustButtonPosition(copyButton, codeBlock);
                    hideButton(copyButton)
                });
            });
        };
    
        // 创建复制按钮
        function createCopyButton() {
            var button = document.createElement('button');
            button.innerHTML = `
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon m-2">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
            `;
            button.classList.add('copy-button');
            return button;
        }
    
        // 复制成功后操作
        function handleCopySuccess(button) {
            button.innerHTML = `
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check js-clipboard-copy-icon m-2">
                    <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                </svg>
            `;
            button.classList.add('copied');
            button.classList.remove('copy-button');
            setTimeout(function() {
                button.innerHTML = `
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon m-2">
                        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                    </svg>
                `;
                button.classList.remove('copied');
                button.classList.add('copy-button');
            }, 1000); // 1秒
        }
    
        // 滚动时调整按钮位置
        function adjustButtonPosition(button, codeBlock) {
            button.style.right = (10 - codeBlock.scrollLeft) + 'px';
        }
    
        // 滚动时隐藏按钮
        function hideButton(button) {
            clearTimeout(button.timeout);
            button.style.display = 'none';
            button.timeout = setTimeout(function() {
                button.style.display = 'flex';
            }, 1000);
        }
    } 


    // 搜索页主题--------------------------------------------------------------------
    
    else if (currentUrl.includes('/tag')) {
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
