# ScriptWhisperer
Helper tools for working with Adobe Photoshop's ScriptListener plugin


 ScriptWhisperer.jsx

## Installing ScriptListener Plugin for Photoshop

Get ScriptingListener plugin from adobe.com:
https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html

Windows
https://download.adobe.com/pub/adobe/photoshop/win/13.x/Win_Scripting_Plug-In.zip

macOS
2020+: https://helpx.adobe.com/content/dam/help/en/photoshop/kb/downloadable-plugins-and-content/Scripting_Plug_In_Release.zip

2019 and earlier: https://download.adobe.com/pub/adobe/photoshop/mac/13.x/Scripting_Plug_In_Release.dmg

## macOS Quarantining Issue

macOS 10.14+ issue with downloaded plugins: 
**.plugin** packages are considered a security risk and may have to be "quarantined".

The following fix is adapted from https://community.adobe.com/t5/indesign-discussions/plugin-error-with-mac-os-catalina/m-p/10660103

1. Quit Photoshop if running.
2. Move the plugin away from its installed location 
(from "**/Applications/Adobe Photoshop 2022/Plug-ins**" to the Desktop for example)
3. Start Photoshop again so it registers the change.
4. Quit Photoshop once more.
5. Move the plugin back to the install location.
6. Unquarantine the plugin with the xattr command using terminal:
    1. Launch terminal
    2. Type `sudo xattr -r -d com.apple.quarantine ` (include the space)
    3. Instead of typing the path, drag the plugin file to the terminal. The result should read:
    `sudo xattr -r -d com.apple.quarantine /Applications/Adobe\ Photoshop\ 2022/Plug-ins/ScriptingListener.plugin`
    4. Press return to run the command (terminal may ask for an admin password)
7. When completed, start Photoshop again.