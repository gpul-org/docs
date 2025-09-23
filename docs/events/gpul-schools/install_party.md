# Linux Install Party - Tips & Tricks

_Escrito por Sprinter05_

## Bitlocker

En algunas instalaciones de Windows si Bitlocker está activado, al arrancar con un USB booteable, después al volver a Windows se quedará atascado pidiendo la clave de recuperación de Bitlocker. Dicha clave se puede encontrar en la cuenta de Microsoft asociada a la instalación de Windows, en los ajustes de la cuenta en la web de Microsoft; se recomienda apuntar la clave a parte.

Si está activado el Bitlocker se recomienda desactivarlo para hacer dual boot, pero es recomendable advertir de lo que supone eso. Hay formas de que el bootloader de Windows conviva con GRUB sin dar problemas de Bitlocker pero requiere varios pasos algo complejos (lo hay en varias webs descrito, pero en ese caso igual hay que buscarse la vida, lo más fácil es desactivarlo pero es a decisión de cada uno).

En esta web se describe el proceso para desactivarlo (aplica a Windows 10 y 11): https://windowsreport.com/disable-bitlocker-windows-11/.

## Intel Rapid Storage Technology

Por algún motivo en algunos portátiles por defecto viene el disco en modo RAID usando el driver de Intel RST. Esto da problemas casi siempre en cualquier instalador tanto de Linux como de Windows por falta de drivers de RAID para detectar el disco. Puede que tengas la suertes de encontrar los drivers por ahí en la web de Intel pero normalmente no van en Linux lo cual complica algo las cosas.

Se recomienda desactivarlo directamente sólo si los instaladores no detectan el disco (se puede hacer desde la BIOS/UEFI), pero es bastante probable que rompa los bootloaders existentes y haga falta recrearlos. Las instrucciones para recrear el de Windows se explican más abajo en este documento en caso de que haga falta.

## Bootloader de Windows

### Comprobar el bootloader

Dentro de Windows usando la herramienta `diskmgmt.msc` (se puede ejecutar desde la ventana de diálogo de Win+R) comprobar el tamaño de la partición de arranque de Windows. Si es de 100MB o menos es muy probable que vaya a dar problemas al instalar Linux.

Por algún motivo los instaladores de la mayoría de distribuciones de Linux aunque crees otra partición EFI siempre intentan instalar en la de Windows y al ser 100MB~ no cabe GRUB por lo que el instalador falla sin especificar el motivo.

Para solucionar esto se recomienda tener un instalador de Windows a mano o en su defecto Win10XPE (https://github.com/ChrisRfr/Win10XPE), aunque es mejor el instalador (estas instrucciones asumen que se está usando un instalador).

### Instalar Linux sin bootloader de Windows

Desde un instalador de Windows hay que pulsar Shift+F10 para abrir un terminal, ejecutar `diskpart` y dentro del programa `list partition` y comprobar el offset (que suele ser 1024) y el tamaño, y apuntarlo. Después hay que borrar desde el instalador de Linux la partición de arranque de Windows y continuar de normal con una partición de arranque EFI exclusiva para Linux (al crear la partición de EFI para Linux es importante no ponerla en el hueco donde previamente estaba la de Windows, que suele ser al principio). **CUIDADO DE NO BORRAR LA PARTICIÓN PRIMARIA DE WINDOWS, SOLO LA DE ARRANQUE**

### Recrear el bootloader de Windows

Para los pasos descritos a continuación se recomienda tener activado Secure Boot si se desactivó previamente o se pretende dejarlo activado al acabar ya que si no después el bootloader de Windows recreado puede fallar.

Una vez instalado Linux, hay que volver al instalador de Windows, abrir `diskpart` y ejecutar `list disk`, mirar el número del disco apropiado con Windows y Linux y ejecutar `select disk <n>` siendo `n` el número de disco. Ejecutar `create partition efi size=<x>` siendo `x` el tamaño apuntado previamente. Si eso no funciona o crea la partición en el hueco equivocado (se puede comprobar usando `list partition`), se recomienda probar el comando de nuevo añadiendo `offset=<y>` siendo `y` el offset apuntado previamente.

A continuación (sin salir de `diskpart`), ejecutar `select partition <n>` siendo `n` el número de la partición EFI creada (comprobar con `list partition`) y ejecutar `format quick fs=fat32` y `assign letter=S` para darle un punto de montaje (vale cualquier otra letra que no esté en uso).

Antes de salir de `diskpart` es bueno comprobar la letra de montaje de Windows ya que desde el instalador no siempre es _C:_. Con `list volume` deberíamos ver todos los volúmenes y sus letras asignadas. Ahora ya podemos salir de `diskpart` y usando `dir <?>:` sustituyendo `?` por las diferentes letras de montaje que haya en el sistema hasta localizar la que tiene la instalación de Windows (se diferencia por tener la carpeta de Windows dentro de ella).

Finalmente instalamos el bootloader (ya fuera de `diskpart`), asumiendo que _C:_ es la ruta de Windows y _S:_ la del bootloader (pero a la hora de ejecutar el comando hay que cambiarlas por las letras correspondientes en cada caso), y usando `bcdboot C:\Windows /s S: /f UEFI` se instalarán los archivos del bootloader. Si no da fallos hemos acabado, se puede reiniciar y verificar que funciona.

## GRUB

### OS Prober

Linux dispone de una herramienta para comprobar si existen otras instalaciones de sistemas operativos en el disco. En el archivo `/etc/default/grub`, se debe descomentar la línea `GRUB_DISABLE_OS_PROBER` si estaba comentada y asegurarse de que tiene el valor `"false"` y comprobar que `os_prober` está instalado en el sistema. Ahora se puede ejecutar `sudo update-grub` o si no existe ese comando `sudo grub-mkconfig -o <grub config file>` (el archivo de configuración suele estar en `/boot/grub/grub.cfg` pero no hace daño comprobar primero) y ya debería añadir la instalación de Windows a la configuración de GRUB.

### Save default

Esto es opcional pero recomendado, al activarlo el bootloader marcará por defecto el último sistema operativo seleccionado en el arranque previo. Desde el archivo `/etc/default/grub` se debe descomentar la línea `GRUB_SAVEDEFAULT` y asegurarse de que tiene el valor `"true"` y la opción `GRUB_DEFAULT` debe tener el valor `"saved"`. Es obligatorio regenerar la configuración de GRUB como se describe en el apartado anterior.

### GRUB no funciona

Si el bootloader de GRUB no se instaló bien aún con todo lo descrito anteriormente se puede intentar instalarlo manualmente usando `chroot` desde otra instalación. Para más detalles la Arch Wiki es tu mejor amiga: https://wiki.archlinux.org/title/GRUB.

## Eduroam

Para instalar eduroam hay que ir a la web https://cat.eduroam.org, seleccionar la universidad y descargar el script de Python. Después ejecutarlo desde cli con `python3 <ruta al archivo>` (en algunos sistemas puede que `python` a secas funcione directamente) y seguir las instrucciones.

Si da un fallo diciendo que no detecta `NetworkManager` hay que instalarlo manualmente creando una conexión desde el editor de `NetworkManager` (aplicación de GUI: `nm-connection-editor`). El certificado se encuentra en `~/.config/cat_installer/ca.pem`.

La conexión debería tener lo siguiente:

- WiFi Security
  - _Security_: WPA/WPA2 Enterprise
  - _Authentication_: Tunneled TLS
  - _Anonymous identity_: anonymous@udc.es
  - _CA certificate_: `ca.pem` (en el directorio del certificado)
  - _Inner authentication_: PAP
    - Cubrir username y password con los de la cuenta de la UDC

## Misceláneo

### Cambiar el layout de teclado en entorno live

Al iniciar en un entorno live se puede cambiar la distribución de teclado usando el comando `setxkbmap es`.

### Añadir el usuario al grupo sudo

En algunas distribuciones no añade al usuario principal al grupo de superusuario por defecto, eso se puede arreglar primero pasando a usuario root usando el comando `su` y después ejecutando `sudo usermod -aG sudo <username>` sustituyendo el nombre de usuario por el que haga falta.

### Sincronizar el reloj con la hora local de Windows

Por defecto Windows guarda en la pila RTC el reloj en zona horaria local en vez de UTC como Linux. Para arreglarlo hay que cambiar que Linux guarde también la hora local. Esto se puede conseguir ejecutando `sudo timedatectl set-local-rtc 1 --adjust-system-clock`
