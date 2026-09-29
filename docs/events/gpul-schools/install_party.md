# Linux Install Party - Tips & Tricks

*Escrito por Sprinter05*

## Pasos a seguir

A continuación se describen los pasos básicos para instalar Linux con dual boot, más información en las secciones relevantes:

1. Conseguir la clave de recuperación de Bitlocker si fuera necesario. 
2. Proceder a desencriptar el disco 
3. Reducir el tamaño de las particiones
4. Desactivar Secure Boot
5. Instalar Linux
6. Realizar los pasos de post-instalación
    - Configurar eduroam 
    - Configurar `timedatectl` para guardar la hora en la pila RTC usando la zona horaria
    - Configurar GRUB para usar `os-prober`
    - Cambiar el bootloader predeterminado al de Linux en la BIOS/UEFI
    - Añadir al usuario al grupo `sudo`/`wheel` si fuera necesario
    - Instalar Flatpak si no está instalado

## Configuración previa en Windows
### Bitlocker

En algunas instalaciones de Windows si Bitlocker está activado, al arrancar con un USB booteable, después al volver a Windows se quedará atascado pidiendo la clave de recuperación de Bitlocker. Dicha clave se puede encontrar en la cuenta de Microsoft asociada a la instalación de Windows, en los ajustes de la cuenta en la web de Microsoft; se recomienda apuntar la clave a parte.

Si está activado el Bitlocker se recomienda desactivarlo para hacer dual boot, pero es recomendable advertir de lo que supone eso. Hay formas de que el bootloader de Windows conviva con GRUB sin dar problemas de Bitlocker pero requiere varios pasos algo complejos (lo hay en varias webs descrito, pero en ese caso igual hay que buscarse la vida, lo más fácil es desactivarlo pero es a decisión de cada uno).

Para ello hay que ir a la configuración de la cuenta de Windows asociada al portátil y acceder a *Dispositivos > Ver detalles > Administrar claves de recuperación de Bitlocker* y copiar los datos que aparezcan ahí en otro dispositivo.

Para quitarlo es necesario ir a la configuración del sistema al apartado de Bitlocker o ejecutar en un `cmd` con privilegios de administrador el comando `manage-bde -status` para comprobar si está habilitado y `manage-bde -off C:` para deshabilitarlo.


### Intel Rapid Storage Technology

Por algún motivo en algunos portátiles por defecto viene el disco en modo RAID usando el driver de Intel RST. Esto da problemas casi siempre en cualquier instalador tanto de Linux como de Windows por falta de drivers de RAID para detectar el disco. Puede que tengas la suertes de encontrar los drivers por ahí en la web de Intel pero normalmente no van en Linux lo cual complica algo las cosas.

Se recomienda desactivarlo directamente sólo si los instaladores no detectan el disco (se puede hacer desde la BIOS/UEFI), pero es bastante probable que rompa los bootloaders existentes y haga falta recrearlos. Las instrucciones para recrear el de Windows se explican más abajo en este documento en caso de que haga falta.

### Reducción de disco

Para reducir el disco hay que abrir la herramienta `diskmgmt.msc` (se puede ejecutar desde la ventana de diálogo que se abre al pulsar las teclas Win+R). Se pulsa en la partición deseada y se elije reducir el volumen. Se recomiendan mínimo 50GB para instalar Linux.

#### Desfragmentación

Si no hay espacio suficiente hay varias formas de intentar reducirlo. La primera es borrar archivos necesarios. La segunda es desfragmentar, esto se puede conseguir abriendo un terminal de administrador (abre el diálogo de Win+R escribe `cmd` y pulsa Ctrl+Shift+Enter) y escribiendo `defrag /A C:` (o la letra que corresponda a la partición a desfragmentar). Si el resultado del análisis dice que se puede desfragmentar hay que ejecutar `defrag C:` y esperar a que acabe, tras lo cual se debe reiniciar.

#### Hibernación

A veces el archivo de hibernación puede ocupar demasiado espacio por lo que se recomienda desactivarlo salvo que el usuario no quiera que se quite. Para hacerlo hay que abrir un terminal de administrador (tal y como se describe en el apartado anterior) y ejecutar `powercfg.exe /hibernate off`, tras lo cual se debe reiniciar.

#### Visor de eventos

Al intentar reducir el volumen suele aparecer información extra de porqué no se puede reducir más espacio. Pulsando las teclas Win+X y eligiendo "Visor de eventos" y abriendo el apartado Registros de Windows > Aplicaciones aparece la información necesaria. Hay que buscar eventos de tipo "Defrag" e ir leyendo la información que dan hasta encontrar uno que te diga que archivo está impidiendo la reducción de disco. A partir de ahí para cada caso hay que buscar información extra online. Si el archivo que impide la reducción es `hyberfile.sys` hay que desactivar la hibernación tal y como se describe en el apartado anterior.

#### Diskpart

Desde un USB externo con un instalador de Windows o un entorno mínimo (se explican más abajo las opciones, pero es recomendable usar un instalador) hay que ejecutar en un terminal `diskpart`. Una vez dentro hay que ejecutar `list vol` y localizar el volumen a reducir, tras lo cual se ejecuta `select vol <n>` (sustituyendo `n` por el número de volumen a reducir) y finalmente se ejecuta `shrink desired=<y>`, siendo `y` el número a reducir en MB (por ejemplo, 50GB es 50000). Si ha funcionado diskpart lo dirá.

## Para la instalación
### Bootloader de Windows
#### Comprobar el bootloader de Windows

Dentro de Windows usando la herramienta `diskmgmt.msc` comprobar el tamaño de la partición de arranque de Windows. Si es de 100MB o menos es muy probable que vaya a dar problemas al instalar Linux.

Por algún motivo los instaladores de la mayoría de distribuciones de Linux aunque crees otra partición EFI siempre intentan instalar en la de Windows y al ser 100MB~ no cabe GRUB por lo que el instalador falla sin especificar el motivo.

Para solucionar esto se recomienda tener un instalador de Windows a mano o en su defecto [Win10XPE](https://github.com/ChrisRfr/Win10XPE), aunque es mejor el instalador (estas instrucciones asumen que se está usando un instalador).

#### Instalar Linux sin bootloader de Windows

Desde un instalador de Windows hay que pulsar Shift+F10 para abrir un terminal, ejecutar `diskpart` y dentro del programa `list partition` y comprobar el offset (que suele ser 1024) y el tamaño, y apuntarlo. Después hay que borrar desde el instalador de Linux la partición de arranque de Windows y continuar de normal con una partición de arranque EFI exclusiva para Linux (al crear la partición de EFI para Linux es importante no ponerla en el hueco donde previamente estaba la de Windows, que suele ser al principio). **CUIDADO DE NO BORRAR LA PARTICIÓN PRIMARIA DE WINDOWS, SOLO LA DE ARRANQUE**.

#### Recrear el bootloader de Windows

Para los pasos descritos a continuación se recomienda tener activado Secure Boot si se desactivó previamente o se pretende dejarlo activado al acabar ya que si no después el bootloader de Windows recreado puede fallar.

Una vez instalado Linux, hay que volver al instalador de Windows, abrir `diskpart` y ejecutar `list disk`, mirar el número del disco apropiado con Windows y Linux y ejecutar `select disk <n>` siendo `n` el número de disco. Ejecutar `create partition efi size=<x>` siendo `x` el tamaño apuntado previamente. Si eso no funciona o crea la partición en el hueco equivocado (se puede comprobar usando `list partition`), se recomienda probar el comando de nuevo añadiendo `offset=<y>` siendo `y` el offset apuntado previamente.

A continuación (sin salir de `diskpart`), ejecutar `select partition <n>` siendo `n` el número de la partición EFI creada (comprobar con `list partition`) y ejecutar `format quick fs=fat32` y `assign letter=S` para darle un punto de montaje (vale cualquier otra letra que no esté en uso).

Antes de salir de `diskpart` es bueno comprobar la letra de montaje de Windows ya que desde el instalador no siempre es _C:_. Con `list volume` deberíamos ver todos los volúmenes y sus letras asignadas. Ahora ya podemos salir de `diskpart` y usando `dir <?>:` sustituyendo `?` por las diferentes letras de montaje que haya en el sistema hasta localizar la que tiene la instalación de Windows (se diferencia por tener la carpeta de Windows dentro de ella).

Finalmente instalamos el bootloader (ya fuera de `diskpart`), asumiendo que _C:_ es la ruta de Windows y _S:_ la del bootloader (pero a la hora de ejecutar el comando hay que cambiarlas por las letras correspondientes en cada caso), y usando `bcdboot C:\Windows /s S: /f UEFI` se instalarán los archivos del bootloader. Si no da fallos hemos acabado, se puede reiniciar y verificar que funciona.

### Tarjeta de red

Algunas tarjetas de red de Mediatek o de Intel pueden no funcionar en algunas versiones de kernel. Hay varias formas de arreglarlo pero la recomendada es usar una distribución con un kernel reciente ya que suelen tener los drivers de dichas tarjetas ya instalados.

Para comprobar si la tarjeta es de Mediatek se puede usar `lshw -C network` o `lspci`.

## Post-instalación
### GRUB

En algunas distribuciones de Linux los comandos y directorios en vez de `grub` pueden ser `grub2`, se recomienda revisarlo y simplemente sustituír cuando sea necesario.

#### OS Prober

Linux dispone de una herramienta para comprobar si existen otras instalaciones de sistemas operativos en el disco. En el archivo `/etc/default/grub`, se debe descomentar la línea `GRUB_DISABLE_OS_PROBER` si estaba comentada y asegurarse de que tiene el valor `"false"` y comprobar que `os_prober` está instalado en el sistema. Ahora se puede ejecutar `sudo update-grub` o si no existe ese comando `sudo grub-mkconfig -o <grub config file>` (el archivo de configuración suele estar en `/boot/grub/grub.cfg` pero no hace daño comprobar primero) y ya debería añadir la instalación de Windows a la configuración de GRUB.

#### Save default

Esto es opcional pero recomendado, al activarlo el bootloader marcará por defecto el último sistema operativo seleccionado en el arranque previo. Desde el archivo `/etc/default/grub` se debe descomentar la línea `GRUB_SAVEDEFAULT` y asegurarse de que tiene el valor `"true"` y la opción `GRUB_DEFAULT` debe tener el valor `"saved"`. Es obligatorio regenerar la configuración de GRUB como se describe en el apartado anterior.

#### GRUB no funciona

Si el bootloader de GRUB no se instaló bien aún con todo lo descrito anteriormente se puede intentar instalarlo manualmente usando `chroot` desde otra instalación.

El comando para instalar GRUB en un sistema UEFI es `grub-install --target=x86_64-efi --efi-directory=<efi directory> --bootloader-id=GRUB` (el directorio EFI suele ser `/boot/efi` o `/boot/EFI`).

Si sigue fallando puede ser porque no permite crear la entrada en la NVRAM, es suficiente con añadirle `--no-nvram` al comando de `--grub-install`. Eso sí, será necesario añadir la entrada del bootloader a la UEFI manualmente en `<efi dir>/BOOT/` (el bootloader id) y nombre `grubx64.efi` o `bootx64.efi`. 

### Eduroam

Para instalar eduroam hay que ir a la web de [eduroam](https://cat.eduroam.org), seleccionar la universidad y descargar el script de Python. Después ejecutarlo desde cli con `python3 <ruta al archivo>` (en algunos sistemas puede que `python` a secas funcione directamente) y seguir las instrucciones.

Si da un fallo diciendo que no detecta `NetworkManager` hay que instalarlo manualmente creando una conexión desde el editor de `NetworkManager` (aplicación de GUI: `nm-connection-editor`). El certificado se encuentra en `~/.config/cat_installer/ca.pem`.

La conexión debería tener lo siguiente:

- WiFi Security
  - _Security_: WPA/WPA2 Enterprise
  - _Authentication_: Tunneled TLS
  - _Anonymous identity_: anonymous@udc.es
  - _CA certificate_: `ca.pem` (en el directorio del certificado)
  - _Inner authentication_: PAP
    - Cubrir username y password con los de la cuenta de la UDC

### Añadir el usuario a superusuarios

En algunas distribuciones no añade al usuario principal al grupo de superusuario por defecto, eso se puede arreglar primero pasando a usuario root usando el comando `su` y después ejecutando `sudo usermod -aG sudo <username>` sustituyendo el nombre de usuario por el que haga falta. En algunas distribuciones puede que el grupo se llame `wheel` en vez de `sudo`.

### Sincronizar el reloj con la hora local de Windows

Por defecto Windows guarda en la pila RTC el reloj en zona horaria local en vez de UTC como Linux. Para arreglarlo hay que cambiar que Linux guarde también la hora local. Esto se puede conseguir ejecutando `sudo timedatectl set-local-rtc 1 --adjust-system-clock`.

### Habilitar Secure Boot en Linux

Es posible habilitar Secure Boot en cualquier distribución Linux pero solo algunas soportan firmar el kernel y el bootloader automáticamente al actualizar. Aquí se explican las conocidas hechas en otras Install Parties. Esto solo es necesario si es necesario tener Secure Boot en Windows.

#### Pasos para cada distribución

Lo primero es asegurarse de que Secure Boot está deshabilitado antes de empezar.

##### Debian / Linux Mint

En principio ambas realizan las firmas automáticamente, solo es necesario realizar el MOK enrollment:

1. `mokutil --import /var/lib/shim-signed/mok/MOK.der`
    - Si el archivo no existe entonces es que la distribución no está haciendo las firmas automáticamente
    - Pedirá crear una contraseña, esta contraseña solo se utilizará para el MOK enrollment, por lo que puede ser algo sencillo
2. `sudo systemctl reboot`
3. Realizar el MOK enrollment
4. Habilitar Secure Boot en la UEFI

Es importante mencionar que si se instalan drivers que no estén en el kernel como los de Nvidia en Linux, es necesario firmarlos también cada vez que se actualizen, lo cual puede requerir instalar el driver usando `dkms` y configurarlo para ser firmado al actualizarse. 

##### Fedora

Para habilitar Secure Boot en Fedora hay que ejecutar los siguientes comandos:

1. `sudo dnf install kmodtool akmods mokutil openssl`
2. `sudo kmodgenca -a`
    - Si dice que la clave ya existe no es necesario ejecutar el comando de nuevo
3. `sudo mokutil --import /etc/pki/akmods/certs/public_key.der`
    - Pedirá crear una contraseña, esta contraseña solo se utilizará para el MOK enrollment, por lo que puede ser algo sencillo
4. `sudo akmods --force --rebuild`
5. `sudo dracut --force`
6. `sudo systemctl reboot`
7. Realizar el MOK enrollment
8. Habilitar Secure Boot en la UEFI

#### MOK Enrollment

Al reiniciar aparecerá una pantalla azul del MOK Enrollment:

1. Pulsar cualquier tecla
2. Seleccionar *Enroll MOK*
3. Seleccionar *Continue*
4. Seleccionar *Yes* y poner la contraseña creada anteriormente
5. Seleccionar *Reboot*

#### Comprobar si ha funcionado

Para comprobar si Secure Boot se ha habilitado es necesario ejecutar `bootctl` y comprobar si *Secure Boot* aparece como *Enabled (deployed)* o *Enabled (user)*.
