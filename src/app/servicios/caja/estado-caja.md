Solo puede haber una sesion de caja abierta en firebase, con un usuario responsable.

- En la base de datos:


-- CajaLog  lleva el registro de las sesiones de Caja. 
        {fecha cierre, 
         fecha apertura, 
         estado (abierta | cerrada)  (solo uno puede estar abierto)
         usuario que la abrio
         id del usario que la abrio
         id de la sesion}

-- Caja: registra las operaciones de caja
      tipo (ingreso |egreso | salida de vehiculo | pago de abonos)
      fecha de la operacion
      importe
      sesion de caja a la que pertenece


- En la app 

el servicio estado-caja gestiona el estado de la sesion actual en firebase
y que puede o no hacer el usuario que ingresa a la app. 



-- modoCaja$ (admin | abierta | cerrada | block )
Determina el estado de la caja segun quien se loguee a la app y el estado de la caja en firebase
Esto determina a su vez el estado de los componentes playa - caja y clientes (pago abono)

-- sesionCaja$ : los datos de la sesion activa - (el item de cajalog que esta abierto)


el servicio caja-storage hace las operacoines de caja y mantiene el estado actual de las ops en la sesion para no estar consultando a la base todo el tiempo con cada cambio de vista.






