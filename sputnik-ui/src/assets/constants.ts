export class Constants {
  // CONFIG SISTEMA
  // =========================== Modificar esta IP ===========================
  public static SERVER_URL = 'http://192.168.4.7/pasarelapagos-api/api';
  // =========================== Modificar esta IP ===========================


  public static USUARIO = 'pasarelabcp';
  public static PASSWORD = 'hTy7UCwRrP';

  public static CANAL = 'internetBanking';
  public static USUARIO_TRANSACCION = 'testTropicalTours';

  public static TITULO_PROYECTO = 'Pasarela de Pagos - Cliente';
  public static TITULO_MODULO_PROYECTO = '';

  public static ENDPOINT_LOGIN = Constants.SERVER_URL +  '/login';
  public static TIEMPO_INACTIVIDAD_MINUTOS = 30;


  public static ENDPOINT_LISTA_AGRUPADORES = Constants.SERVER_URL +  '/agrupadores';
  public static ENDPOINT_LISTA_LOCALIZADORES = Constants.SERVER_URL +  '/localizadores';
  public static ENDPOINT_LISTA_AGRUPADORES_LOCALIZADORES = Constants.SERVER_URL +  '/agrupadores';
  public static ENDPOINT_LISTA_CLIENTES = Constants.SERVER_URL +  '/clientes';
  public static ENDPOINT_REALIZAR_PAGO = Constants.SERVER_URL +  '/agrupadores';
  public static ENDPOINT_LISTA_CONCILIACIONES = Constants.SERVER_URL +  '/conciliaciones';
}
