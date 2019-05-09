# Gallery Plugin for TinyMCE

- **Made for TinyMCE 4.x**
- **See the test page [*Test.html*] to see the plugin in use.**

### How to Install
You have just to import as any other local TinyMCE plugin.

Or you can do this:
- put the plugin directory `gallery` into the plugins folder of TinyMCE.
- include `gallery` into the `plugins` string on `tinymce.init` call.
- you can also add the `gallery` into the `toolbar` string.

**Example:**
```javascript
tinymce.init({
    selector: '#mytextarea',
    plugins: 'gallery',
    toolbar: 'gallery'
});
```

### How to use
Once the plugin was correctly installed you'll be able to see the **Gallery** option in the **Insert** menu or if you have added the `gallery` in the toolbar you can find the gallery icon there.
![gallery icon](https://raw.githubusercontent.com/WTamaso/gallery-plugin/master/tinymce/plugins/gallery/img/icon.gif)
After clicking on it a pop-up will appear. 

On the bottom part of the pop-up you will see some buttons:
- Add Image
    - Opens the **image form**.
- Insert
    - Add your gallery to your content. 
    (It will aply your changes if you are modifying a gallery)
- Remove
    - Removes the gallery.
    (Only if you are modifying a gallery.)
- Cancel
    - Closes the pop-up discarding all changes.

In the **image form** you have some input fields and buttons:
- Image url *Required
    - Write or paste your image URL
- Search
    - You can modify the plugin's code to use a custom file manager or you can remove this button.
- Alternative text *Required
    - Write or paste the image's alternative text for accessibility reasons.
- Title
    - Write or paste the image's title.
- Description
    - Write or paste the image's description.
- Credits
    - Write or paste the image's credits.
- Add
    - Adds your image in the gallery.
- Cancel
    - Closes the form.

With some images in the gallery they will be visible in the main table of the pop-up. The actions available to do are self explanatory.

> Note: If the cursor was inside an already added gallery you will modify it, otherwise you will create a new one.

The resulting code of the gallery looks like this
```html
<div id="slides">
    <div id="slide">
        <img
            title="THE TITLE GOES HERE"
            src="THE URL GOES HERE"
            alt="THE ALTERNATIVE TEXT GOES HERE"
            longdesc="THE DESCRIPTION GOES HERE"
        />
        <div id="title">THE TITLE GOES HERE</div>
        <div id="desc">THE DESCRIPTION GOES HERE</div>
        <div id="cred">THE CREDITS GOES HERE</div>
    </div>
    <div id="slide">
        <img 
            title="THE TITLE GOES HERE" 
            src="THE TITLE GOES HERE" 
            alt="THE ALTERNATIVE TEXT GOES HERE" 
            longdesc="THE DESCRIPTION GOES HERE"
        />
        <div id="title">THE TITLE GOES HERE</div>
        <div id="desc">THE DESCRIPTION GOES HERE</div>
        <div id="cred">THE CREDITS GOES HERE</div>
    </div>
</div>
```
You should manipulate it in your front-end to do what you want. 
This plugin are a tool for create and edit galleries inside the **TinyMCE** editor.

> Note: It's recommended to run the test on a local web server, running directly from file may cause some malfunctions.




















