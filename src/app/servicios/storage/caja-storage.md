El servico caja Storgae

- Al inicio se suscribe a un observable id sesion. 
  cuando esta vaci ano hace nada.
  cuando tiene el numero de sesion opera con con esa sesion.

- realiza las operaciones de caja dentro la sesion abierta
   
   - Ingresos, Egresos directos o a traves de cobro en playa y clientes que paguen abono

   - Apertura: solo registra si se ingresa saldo inicial

   - Cierre de Caja: solo registra el saldo que se extrae al cerrrar

- A cada operacon le ingresa el id de sesion

- La apertura y cierre de la sesion son derivadas al servicio estadoCaja.