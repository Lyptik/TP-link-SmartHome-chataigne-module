TP-link-SmartHome-chataigne-module
=========================

A [Chataigne][] module to control TP-link smart home appliance such as HS110 smart plug

Install
-------

- Start Chataigne
- Right click on the modules panel
- Click on "Get more modules"
- Install the module :)

or

```
git clone https://github.com/Lyptik/TP-link-SmartHome-chataigne-module
```

in the following directory

- Mac OSX : /Users/Username/Documents/Chataigne/modules
- Windows : C:\Users\Username\Documents\Chataigne\modules
- Linux   : /home/Username/Chataigne/modules

Then restart [Chataigne][]

Use
---
In [Chataigne][], the module will appear in the Hardware submenu alongside the other modules.

Documentation
-------------

This code is based on several references :

HS110 reverse engineering documentation : https://www.softscheck.com/en/reverse-engineering-tp-link-hs110/#TP-Link%20Smart%20Home%20Protocol

Python client and wireshark dissector : https://github.com/softScheck/tplink-smartplug

Python Library and complete tool : https://github.com/GadgetReactor/pyHS100

Dev
---

Modify the script file, when you save, it gets automatically refreshed in Chataigne.

Don't forget to activate the log to see the output of your script.

When you modify the module.json file, you need to restart [Chataigne][] or Click on File -> Reload Custom Modules

Contribute
----------

Fork and submit pull requests! :)

Thanks
------

Thanks to [BenKuper] for his kind support and his awesome open source software.

[Chataigne][] is opensource you can check it here : https://github.com/benkuper/Chataigne

[BenKuper]: https://github.com/benkuper
[Chataigne]: https://benjamin.kuperberg.fr/chataigne/
[Augmenta]: https://www.augmenta-tech.com/
[Théoriz studio]: https://www.theoriz.com/
