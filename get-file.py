import sys
f = open("settings.xml","w")
f.write("""
<data>
    <items>
        <item type="thing" heavy="true">Rock</item>
        <item type="thing" heavy="false">Paper</item>
        <item type="thing" heavy="true">Scisr</item>
    </items>
</data>
""")
f.close()
print("settings.xml")