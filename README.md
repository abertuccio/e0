# index.js

## ACCIONES
Atiente las peticiones de los dispositivos y devuelve su estado o bloquea la ip.

## REQUERIMIENTOS
requiere un hash (h) y un timestamp (ts)

Ejémplo de petición en el formato correcto

### LOCAL
http://127.0.0.1:9000/?h=b06c270be13ef2b75d329e73da06f057ae4ab0a9bba2e26e3cc805867909ce67&ts=1453046345961

### OPENSHIFT
http://elep-elep.rhcloud.com/?h=b06c270be13ef2b75d329e73da06f057ae4ab0a9bba2e26e3cc805867909ce67&ts=1453046345961

### CLOUD
https://el0-ca23sere.c9users.io/?h=b06c270be13ef2b75d329e73da06f057ae4ab0a9bba2e26e3cc805867909ce67&ts=1453046345961
			
## PASOS
1. Se evalua ts enviado, si la peticion tiene mas de 5 segundos de antiguedad o ts == undefined, el servidor no penaliza pero no responde. Sin ts penalizará después en 2.
2. Se evalua si existe h y ts como condicion para continuar, pero no se penaliza por hilos fantasmas.
3. Se busca el estado del dispositivo con hash e ip (timestamp no lo consideramos).
    1. Encuentra la ip en dev (datos del dispositivo). 
        1. Devuelve el estado.
    2. No encuentra la ip en dev.
        1. Se verifica si la ip que realiza la petición es nueva o vieja.
            1. La ip es nueva.
                1. Se valida el hash. Si no pasa E4 y penalizacion = 1 en ipreq.
                2. Se valida en timestamp. Si no pasa E4 y penalizacion = 1 en ipreq.
                3. Devuelve el estado del dispositivo. E0, E1, E2, E3.
            2. La ip es vieja.				
			    1. Se verifica si la ip está penalizada. Si está E4.
				2. Se verifica si la petición esta en el intervalo correcto. Si no E4. VER PORQUE CONCURREN 2 PETICIONES DE LA MISMA IP.
				3. Se valida el hash. Si no pasa E4 y penalizacion = 1 en ipreq.
				4. Se valida en timestamp. Si no pasa E4 y penalizacion = 1 en ipreq.		
				5. Devuelve el estado del dispositivo.
				6. Si es distinto de E2 y E4, Actualizamos la cantidad. Si la cantidad a actualizar es igual o superior a 432000 (mas de 5 días) se coloca la ip en dev, lo que significa que entra en la lista blanca. Se cumple 1.1.1.
				 
## ESTADOS

* 0 Apagado
* 1 Encendido
* 2 Sin Asociación
* 3 Reset
* 4 Ip bloqueada