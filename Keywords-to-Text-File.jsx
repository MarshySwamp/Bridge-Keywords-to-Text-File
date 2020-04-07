/*
Utility Pack Scripts created by David M. Converse ©2018-19
Read keywords from files and save to file for import into Bridge
Last modified 7/22/2019
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
#target bridge
if(BridgeTalk.appName == 'bridge'){
    try{
        var kwCap = MenuElement.create('command', 'Keyword Capture', 'at the end of Tools');
        kwCap.onSelect = function(){
            var kwList = app.document.selections;
            var i = 0;
            var j = 1;
            var k = 1;
            var kw_clean = []; //optimized keywords array
            var kw_line = '';
            var kwCapLogFile = File('~/Desktop/kw.txt'); //file to write list to
            kwCapLogFile.open('w:');
            if (ExternalObject.AdobeXMPScript == undefined)  ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
            for(i = 0; i < kwList.length; i++){ //loop through selected files
                if(kwList.hasMetadata){ //only process files with metadata
                    k = 1;
                    kw_clean = [];
                    //XMP stores keywords in three namespaces. We don't process the Microsoft keyword namespace.
                    var kw = kwList.synchronousMetadata.read(XMPConst.NS_DC, 'subject').toString();
                    var lrkw = kwList.synchronousMetadata.read('http://ns.adobe.com/lightroom/1.0/', 'hierarchicalSubject').toString();
                    if(kw != '' || lrkw != ''){ //at least one namespace has keywords
                        kw = kw.split(','); //make arrays out of keyword string
                        lrkw = lrkw.split(',');
                        kw = kw.concat(lrkw); //place all keywords in one array and sort
                        kw.sort();
                        if(kw[0] != ''){
                            kw_clean[0] = kw[0];
                            }
                        else{ //flag empty keywords
                            k = 0;
                            }
                        for(j = 1; j < kw.length; j++){ //eliminate duplicates and write into new array
                            if(kw[(j - 1)] != kw && kw != ''){
                                kw_clean = kw;
                                k++;
                                }
                            }
                        for(j = 0; j < kw_clean.length; j++){ //write optimized list of keywords to file
                            kw_clean = kw_clean.replace(/\|/g, '\r\t'); //convert hierarchical keywords - change delimiter as required
                            if(kw_line != ''){
                                kw_line = kw_line + '\r' + kw_clean; //write each keyword to a new line
                                }
                            else{ //first line for file, don't add extra return
                                kw_line = kw_clean;
                                }
                            }
                        kwCapLogFile.writeln(kw_line); //write to file
                        kw_line = ''; //reset for next file
                        }
                    }
                }
            kwCapLogFile.close();
            alert('Keyword capture completed');
            }
        }
    catch(e){
        alert(e + e.line);
        }
    }
