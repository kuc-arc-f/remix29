import Config from '../../config'
import LibCookie from './LibCookie';
//
const LibFlash = {
  getMessageObject: function(){
    try {
      const key_success = Config.COOKIE_KEY_MESSAGE_SUCCESS;
      const key_error = Config.COOKIE_KEY_MESSAGE_ERROR;
      const msgOk = LibCookie.get_cookie(key_success);
      const msgNg = LibCookie.get_cookie(key_error);
      LibCookie.delete_cookie(key_success);
      LibCookie.delete_cookie(key_error);
      return {
        success: msgOk, error: msgNg
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error , getMessageObject');
    }    
  },
  setMessage: async function(message: string | null){
    try {
      const key_success = Config.COOKIE_KEY_MESSAGE_SUCCESS;
      LibCookie.set_cookie(key_success, message);
    } catch (error) {
      console.error(error);
      throw new Error('Error , setMessage');
    }    
  },
  setError: async function(message: string){
    try {
      const key_error = Config.COOKIE_KEY_MESSAGE_ERROR;
      LibCookie.set_cookie(key_error, message);
    } catch (error) {
      console.error(error);
      throw new Error('Error , setError');
    }    
  },
}
export default LibFlash
