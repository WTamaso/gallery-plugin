tinymce.PluginManager.add("gallery", function (editor, url) {
    editor.addButton('gallery', {
        tooltip: 'Insert/modify gallery',
        image: './tinymce/plugins/gallery/img/icon.gif',
        onclick: function () {
            editor.windowManager.open({
                title: 'Insert gallery',
                url: './tinymce/plugins/gallery/gallery.html',
                width: 900,
                height: 600,
                buttons: [
                    {
                        text: 'Insert',
                        onclick: function () {
                            var b = editor.windowManager.getWindows()[0];
                            prepareHTML(editor);
                            editor.insertContent(b.getContentWindow().document.getElementById("htmlGallery").innerHTML);
                            b.close();
                        }
                    }, {
                        text: 'Remove',
                        onclick: function () {
                            editor.windowManager.open({
                                title: "Remove gallery", body: [{
                                    type: "container", html: "<p>Are you sure you want to remove the gallery?</p>"
                                    }], buttons: [
                                    {
                                        text: "Yes", onclick: function () {
                                            prepareHTML(editor);
                                            editor.windowManager.getWindows()[1].close();
                                            editor.windowManager.getWindows()[0].close();
                                        }
                                    },
                                    {
                                        text: "No", onclick: function () {
                                            editor.windowManager.getWindows()[1].close();
                                        }
                                    }
                                ]
                            });
                        }
                    },
                    {
                        text: 'Cancel',
                        onclick: 'close'
                    }
                ]
            }, {
                element: editor.selection.getNode(),
                url: url
            });
        },
        onpostrender: function () {
            var btn = this;
            editor.on('NodeChange', function (e) {
                var g = false;
                while (e.element.nodeName !== "BODY") {
                    if (e.element.nodeName === "DIV" && e.element.getAttribute("id") === "slides") {
                        g = true;
                        break;
                    }
                    e.element = e.element.parentNode;
                }
                btn.active(g);
            });
        }
    });
    editor.addMenuItem('gallery', {
        text: 'Gallery',
        context: 'insert',
        onclick: function () {
            editor.windowManager.open({
                title: 'Insert gallery',
                url: './tinymce/plugins/gallery/gallery.html',
                width: 900,
                height: 600,
                buttons: [
                    {
                        text: 'Insert',
                        onclick: function () {
                            var b = editor.windowManager.getWindows()[0];
                            prepareHTML(editor);
                            editor.insertContent(b.getContentWindow().document.getElementById("htmlGallery").innerHTML);
                            b.close();
                        }
                    }, {
                        text: 'Remove',
                        onclick: function () {
                            editor.windowManager.open({
                                title: "Remove gallery", body: [{
                                    type: "container", html: "<p>Are you sure you want to remove the gallery?</p>"
                                    }], buttons: [
                                    {
                                        text: "Yes", onclick: function () {
                                            prepareHTML(editor);
                                            editor.windowManager.getWindows()[1].close();
                                            editor.windowManager.getWindows()[0].close();
                                        }
                                    },
                                    {
                                        text: "No", onclick: function () {
                                            editor.windowManager.getWindows()[1].close();
                                        }
                                    }
                                ]
                            });
                        }
                    },
                    {
                        text: 'Cancel',
                        onclick: 'close'
                    }
                ]
            }, {
                element: editor.selection.getNode(),
                url: url
            });
        }
    });
});

function prepareHTML(editor) {
    var element = editor.selection.getNode();
    while (element.nodeName !== "BODY") {
        if (element.nodeName === "DIV" && element.getAttribute("id") === "slides") {
            element.parentNode.removeChild(element);
            break;
        }
        element = element.parentNode;
    }
}