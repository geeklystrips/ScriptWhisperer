# ScriptWhisperer
Helper tools for working with Adobe Photoshop's ScriptListener plugin


 ScriptWhisperer.jsx

# Installing Plugin
    ----
    Get ScriptingListener plugin from Adobe website:

    https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html

    Windows
    https://download.adobe.com/pub/adobe/photoshop/win/13.x/Win_Scripting_Plug-In.zip

    macOS
    2020+: https://helpx.adobe.com/content/dam/help/en/photoshop/kb/downloadable-plugins-and-content/Scripting_Plug_In_Release.zip

    2019 and earlier: https://download.adobe.com/pub/adobe/photoshop/mac/13.x/Scripting_Plug_In_Release.dmg

# macOS Quarantining Issue

        macOS 10.14+ issue with downloaded plugins: 
        .plugin packages are considered a security risk and may have to be "quarantined".

        The following fix is adapted from https://community.adobe.com/t5/indesign-discussions/plugin-error-with-mac-os-catalina/m-p/10660103

        ----

        Quit Photoshop if running.
        
        Move the plugin from out its place, e.g. to the Desktop.
        
        Start Photoshop again, so that it considers/registers the change.
        
        Quit Photoshop.
        
        Move the plugin back.
        
        Unquarantine the plugin with the xattr command in terminal:

            - Launch terminal
            - type "sudo xattr -r -d com.apple.quarantine " without the quotes and without return, but including the final space
            - Instead of typing the path, drag the plugin file to the terminal.

              The result should read:
              sudo xattr -r -d com.apple.quarantine /Applications/Adobe\ Photoshop\ 2022/Plug-ins/ScriptingListener.plugin

            - press return to run the command (terminal may ask for an admin password)
            - When completed, start Photoshop.