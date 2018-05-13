export class Constants {
  // CONFIG SISTEMA
  // =========================== Modificar esta IP ===========================
  public static SERVER_URL = 'http://localhost/sputnik-api';
  // =========================== Modificar esta IP ===========================

  public static TITULO_PROYECTO = 'Sputnik';
  public static TITULO_MODULO_PROYECTO = '';
  public static TIEMPO_INACTIVIDAD_MINUTOS = 30;
  public static REGISTROS_PAGINA = 10;

  public static ENDPOINT_LOGIN = Constants.SERVER_URL +  '/login';
  public static ENDPOINT_LOGOUT = Constants.SERVER_URL +  '/api/account/logout';
  public static ENDPOINT_LISTA_CANAL = Constants.SERVER_URL +  '/api/canales';
  public static ENDPOINT_LISTA_MEDIO_PAGO = Constants.SERVER_URL +  '/api/mediospago';
  public static ENDPOINT_LISTA_CONCILIACIONES = Constants.SERVER_URL +  '/api/conciliaciones';





}
