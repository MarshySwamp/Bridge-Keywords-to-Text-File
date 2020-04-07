# Bridge-Keywords-to-Text-File
Adobe Bridge script to export selected files ds:subject/keyword metadata to text file

Script written by Lumigraphics at the Adobe Bridge Community Forum
https://community.adobe.com/t5/bridge/how-to-recover-my-lost-keywords-in-bridge/td-p/10539314?page=1

The script below will read keywords from files and write them to a text file that can be directly imported into Bridge. Duplicate keyword entries are ignored on import.

Three caveats:

1. If you have nested hierarchical keywords, you will need to edit the generated text file and add an extra tab in front of those keywords.

Example:
Bird | Raptor | Hawk

Exported keyword file would be
Bird
<tab>Raptor
<tab><tab>Hawk
  
My generated file would be
Bird
<tab>Raptor
<tab>Hawk

Which would result in
Bird | Raptor
Bird | Hawk
  
2. I have the hierarchical delimiter hardcoded as "|" so if your files use a different delimiter, edit Line 60.

3. The generated filename is hardcoded to ~/Desktop/kw.txt

Anyone is welcome to further develop this script per the license to fix those issues.
