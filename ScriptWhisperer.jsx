/*

    ScriptWhisperer.jsx

    Helper tools for working with Adobe Photoshop's ScriptListener plugin

    ----

    Sources: 
    
    from xbytor's xtools
    http://ps-scripts.sourceforge.net/xtools.html (see xtools_license.txt)

        GenericUI.jsx
        PSConstants.js
        SLCFix.js
        TextProcessor.js
    
    JSUI.js from geeklystrips

*/

#target photoshop;

#include "jsui.js";


function toggleListener( bool )
{
    try
    {
        var d = new ActionDescriptor;
        d.putBoolean(charIDToTypeID('Log '), bool);
        executeAction(stringIDToTypeID("AdobeScriptListener ScriptListener"), d, DialogModes.NO);
    }
    catch(e)
    {   
      alert("Error toggling!");
    }
};

function activateListener()
{
    toggleListener(true);
};

function deactivateListener()
{
    toggleListener(false);
};

function showSLinfo()
{
    var msg = "";

    try
    {
        // this does not guarantee that ScriptListener is present, it's just a clue as to what may be happening.

        var isWindows = $.os.match(/windows/i) == "Windows";
        var pluginsURI = new Folder( app.path + "/" + localize("$$$/private/Plugins/DefaultPluginFolder=Plug-Ins") ) ;
        var pluginName = isWindows ? "ScriptListener.8li" : "ScriptingListener.plugin" ;
        var pluginFile = ( isWindows ? new Folder ( pluginsURI + "/" + pluginName ) : new File ( pluginsURI + "/" + pluginName ) );

        msg += "ScriptingListener plugin:\n\n" + pluginFile.fsName + "\n\nExists: " + pluginFile.exists;
    }
    catch(e)
    {
        msg += ( e + "\n\nError accessing ScriptListener plugin.\n\n" );
        msg += (pluginFile.fsName + ( pluginFile.exists ? "\nPlugin file present. Restart Photoshop. " : "\nPlugin file not found" ));
        if($.level) $.writeln(msg);
        else  alert(msg);
    }

    if(msg.length) 
    {
        alert(msg);
        //JSUI.showInfo( msg, "https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html" );

    }
    else
    {
        prompt( "Need to install the ScriptListener plugin? Refer to this page:", "https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html", "ScriptListener Info" );
    }

};

function clearLog()
{
    var success = false;
    var file = new File(JSUI.PREFS.SLjsLog);

    if(file.exists)
    {
        try
        {
            file.encoding = "UTF-8";
            file.open("w");
            file.write("");
            file.close();
            success = true;
        }
        catch(e)
        {
            file.close();
            var msg = "";
            if($.level) $.writeln("Unable to write to file.\n" + msg + "\n" + e);
        }

    }
    return success;
};

function fixLog()
{
    var success = false;
    var file = new File(JSUI.PREFS.SLjsFixed);

    // eval SLCFix.js
    if($.level) $.writeln("\nRunning SLCFix.js...");
    var slcfixURI = new File(JSUI.URI + "/SLCFix.js");

    if(slcfixURI.exists)
    {
        try
        {
            $.evalFile(slcfixURI);
        }
        catch(e)
        {
            alert(e + "\n\n" + slcfixURI);
        }
    }
};

function removeFiles()
{
    var success = false;

    var logURI = new File(JSUI.PREFS.SLjsLog);
    var fixedCodeURI = new File(JSUI.PREFS.SLjsFixed);

    try
    {
        if($.level)$.writeln("Removing file:\n"+logURI.fsName);
        logURI.remove();

        if($.level)$.writeln("Removing file:\n"+fixedCodeURI.fsName);
        fixedCodeURI.remove();
        success = true;
    }
    catch(e)
    {
        if($.level)$.writeln(e+"\n\nFile(s) could not be removed.")
    }

    return success;
}

function Main()
{
    // showSLinfo();

    JSUI.TOOLNAME = "ScriptWhisperer";
    JSUI.populateINI();
    JSUI.autoSave = true;

    _prefs = function()
    {
        this.SLjsLog = Folder.desktop + "/ScriptingListenerJS.log";
        this.SLjsFixed = Folder.desktop + "/ScriptingListenerJS.jsx";

        return this;
    }

    JSUI.PREFS = JSUI.readIniFile(new _prefs());

    var win = JSUI.createDialog( { title: JSUI.TOOLNAME, orientation: "column", width: 400 });

    var panel1 = win.addPanel( { label: "ScriptListener Plugin", alignment: "fill", orientation: "row"} );
    var activateSL = panel1.addButton({label:"Activate", helpTip: "Activate ScriptListener", onClickFunction: activateListener});
    var deactivateSL = panel1.addButton({label:"Deactivate", helpTip: "Deactivate ScriptListener", onClickFunction: deactivateListener });

    var panel2 = win.addPanel( { label: "ScriptListener Logs", alignment: "fill"} );
    var SLjsLog = panel2.addBrowseForFileReplace("SLjsLog", { filter: "log"});
    var SLjsFixed = panel2.addBrowseForFileReplace("SLjsFixed", { filter: "jsx"});

    var buttonBar = panel2.addRow();
    var clearBtn = buttonBar.addButton({label:"Clear", height: 44, helpTip: "Clear ScriptListener log file", onClickFunction: clearLog});
    var fixBtn = buttonBar.addButton({label:"Fix", height: 44, helpTip: "Fix ScriptListener code", onClickFunction: fixLog});
    var removeBtn = buttonBar.addButton({label:"Remove", height: 44, helpTip: "Remove log and fixed code", onClickFunction: removeFiles});

    var winButtonsRow = win.addRow( { alignChildren:'fill', alignment: "center", margins: 15 } );
    winButtonsRow.addCloseButton();

	win.show();

};

Main();