	
/* ********** GENERAL SCRIPTING **********************

		This templates shows what you can do in this is module script
		All the code outside functions will be executed each time this script is loaded, meaning at file load, when hitting the "reload" button or when saving this file
*/


// You can add custom parameters to use in your script here, they will be replaced each time this script is saved
//var myFloatParam = script.addFloatParameter("My Float Param","Description of my float param",.1,0,1); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1
var activate = script.addTrigger("Activate HS110", "Activate HS110");
var deactivate = script.addTrigger("Deactivate HS110", "Deactivate HS110");

//Here are all the type of parameters you can create
/*
var myTrigger = script.addTrigger("My Trigger", "Trigger description"); 									//This will add a trigger (button)
var myBoolParam = script.addBoolParameter("My Bool Param","Description of my bool param",false); 			//This will add a boolean parameter (toggle), defaut unchecked
var myFloatParam = script.addFloatParameter("My Float Param","Description of my float param",.1,0,1); 		//This will add a float number parameter (slider), default value of 0.1, with a range between 0 and 1
var myIntParam = script.addIntParameter("My Int Param","Description of my int param",2,0,10); 				//This will add an integer number parameter (stepper), default value of 2, with a range between 0 and 10
var myStringParam = script.addStringParameter("My String Param","Description of my string param", "cool");	//This will add a string parameter (text field), default value is "cool"
var myColorParam = script.addColorParameter("My Color Param","Description of my color param",0xff0000ff); 	//This will add a color parameter (color picker), default value of opaque blue (ARGB)
var myP2DParam = script.addPoint2DParameter("My P2D Param","Description of my p2d param"); 					//This will add a point 2d parameter
var myP3DParam = script.addPoint3DParameter("My P3D Param","Description of my p3d param"); 					//This will add a point 3d parameter
var myTargetParam = script.addTargetParameter("My Target Param","Description of my target param"); 			//This will add a target parameter (to reference another parameter)
var myEnumParam = script.addEnumParameter("My Enum Param","Description of my enum param",					//This will add a enum parameter (dropdown with options)
											"Option 1", 1,													//Each pair of values after the first 2 arguments define an option and its linked data
											"Option 2", 5,												    //First argument of an option is the label (string)
											"Option 3", "banana"											//Second argument is the value, it can be whatever you want
											); 	
*/


//you can also declare custom internal variable
//var myValue = 5;

/*
 The init() function will allow you to init everything you want after the script has been checked and loaded
 WARNING it also means that if you change values of your parameters by hand and set their values inside the init() function, they will be reset to this value each time the script is reloaded !
*/
function init()
{
	//myFloatParam.set(5); //The .set() function set the parameter to this value.
	//myColorParam.set([1,.5,1,1]);	//for a color parameter, you need to pass an array with 3 (RGB) or 4 (RGBA) values.
	//myP2DParam.set([1.5,-5]); // for a Point2D parameter, you need to pass 2 values (XY)
	//myP3DParam.set([1.5,2,-3]); // for a Point3D parameter, you need to pass 3 values (XYZ)
}

/*
 This function will be called each time a parameter of your script has changed
*/
function scriptParameterChanged(param)
{
	//You can use the script.log() function to show an information inside the logger panel. To be able to actuallt see it in the logger panel, you will have to turn on "Log" on this script.
	//script.log("Parameter changed : "+param.name); //All parameters have "name" property
	if(param.is(activate)) {
	
		script.log("Activating HS110...");
		//local.send("Test String\n");
		local.sendBytes(34);


	} else if(param.is(deactivate)) {

		script.log("Deactivating HS110...");
		local.send("Test String"); 		
	}
	else if(param.is(myEnumParam)) script.log("Label = "+param.get()+", data = "+param.getData()); //The enum parameter has a special function getData() to get the data associated to the option
	else script.log("Value is "+param.get()); //All parameters have a get() method that will return their value
}

/*
 This function, if you declare it, will launch a timer at 50hz, calling this method on each tick
*/
/*
function update(deltaTime)
{
	script.log("Update : "+util.getTime()+", delta = "+deltaTime); //deltaTime is the time between now and last update() call, util.getTime() will give you a timestamp relative to either the launch time of the software, or the start of the computer.
}
*/



/* ********** MODULE SPECIFIC SCRIPTING **********************

	The "local" variable refers to the object containing the scripts. In this case, the local variable refers to the module.
	It means that you can access any control inside  this module by accessing it through its address.
	For instance, if the module has a float value named "Density", you can access it via local.values.density
	Then you can retrieve its value using local.values.density.get() and change its value using local.values.density.set()
*/

/*
 This function will be called each time a parameter of this module has changed, meaning a parameter or trigger inside the "Parameters" panel of this module
 This function only exists because the script is in a module
*/
function moduleParameterChanged(param)
{

	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
	}else 
	{
		if(param.name == "discoverDevices")
		{
			discoverDevices();
		}
			
	}
}

/*
 This function will be called each time a value of this module has changed, meaning a parameter or trigger inside the "Values" panel of this module
 This function only exists because the script is in a module
*/
function moduleValueChanged(value)
{

	if(value.isParameter())
	{
		script.log("Module value changed : "+value.name+" > "+value.get());	
	}else 
	{
		script.log("Module value triggered : "+value.name);	
	}


}

	


/* ********** STREAMING MODULE (UDP, SERIAL) SPECIFIC SCRIPTING ********************* */
/*

Streaming Modules (i.e. UDP and Serial Module) have specific methods that can be used to handle receiving and sendin data over the connection.
With streaming modules, there are 2 ways of sending data : either as a UTF-8 String or as separate bytes

local.send("This is my message"); //This will send the string passed in as ASCII characters 
local.sendBytes(30,210,46,255,10); //This will send all the bytes passed in as they are

*/

/*
You can intercept all the received data from this module with the method dataReceived(data).
Depending on the Protocol you chose, the nature of the data passed in this function will be different.
*/

function dataReceived(data)
{
	//If mode is "Lines", you can expect data to be a single line String
	script.log("Data received : " +data);

	//If mode is anything else, you can expect data to be an array of bytes
	script.log("Bytes received : "+data.length);
	for(var i=0; i < data.length; i++)
	{
		script.log(" > " + data[i]);
	}
}

function discoverDevices()
{
	/*
	Sends discovery message to 255.255.255.255:9999 in order
    to detect available supported devices in the local network,
    and waits for given timeout for answers from devices.
    Receives an array of json objects {"ip", "port", "sys_info"}
	*/

	broadcastIP = "255.255.255.255";
	broadcastPort = 9999;
	timeout = 3;
    discoveryPackets=3;
    
    /*discoverQuery = "{\
    	"system": {"get_sysinfo": None},\
        "emeter": {"get_realtime": None},\
        "smartlife.iot.dimmer": {"get_dimmer_parameters": None},\
        "smartlife.iot.common.emeter": {"get_realtime": None},\
        "smartlife.iot.smartbulb.lightingservice": {"get_light_state": None},\
    }";*/

    discoverQuery=""test"\
    test2";
    script.log("DiscoverQuery : "+discoverQuery);

	script.log("Attempting to discover devices on current network...");
	    
	// Send discover query
	// Receive ip and port and type
	// Store and display result in list of device found
}

function encrypt(request)
{
/*      
    Encrypt a request for a TP-Link Smart Home Device.

    :param request: plaintext request data
    :return: ciphertext request
*/

    var key = 117;

    var plainbytes = request;
    //var buffer = bytearray(struct.pack(">I", len(plainbytes)));
    var buffer = [];
    buffer[0]=">I";
    buffer[1]=plainbytes.length();

    /*for(plainbyte in plainbytes) {
        cipherbyte = key ^ plainbyte;
        key = cipherbyte;
        buffer.append(cipherbyte);
    }*/

    return bytes(buffer);
}


function decrypt(ciphertext)
{
/*
    Decrypt a response of a TP-Link Smart Home Device.

    :param ciphertext: encrypted response data
    :return: plaintext response
*/

    var key = 117;
    var buffer = [];

    /*for(cipherbyte in ciphertext) {
        plainbyte = key ^ cipherbyte;
        key = cipherbyte;
        buffer.append(plainbyte);

    plaintext = bytes(buffer);*/

    return plaintext.decode();
}
