package com.xohto.opennfcreceptor;

import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.IsoDep;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;

public class HCEReceptor extends ReactContextBaseJavaModule implements NfcAdapter.ReaderCallback {

    private NfcAdapter nfcAdapter;
    private String message = "";
    private Callback callback;

    public HCEReceptor(ReactApplicationContext context) {
        super(context);
        nfcAdapter = NfcAdapter.getDefaultAdapter(context);
    }

    @ReactMethod
    public void getMessage(Callback _callback) {
        this.callback = _callback;
        nfcAdapter = NfcAdapter.getDefaultAdapter(getReactApplicationContext());
        nfcAdapter.enableReaderMode(getCurrentActivity(), this, NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK, null);
    }

    @NonNull
    @Override
    public String getName() {
        return "HCEReceptor";
    }

    ///
    ///
    ///

    private static final byte[] CLA_INS_P1_P2 = {0x00, (byte) 0xA4, 0x04, 0x00}; // 0x04 is the offset into file at which to write the data
    private static final byte[] AID_ANDROID = {(byte) 0xF0, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06};

    private byte[] createSelectAidApdu(byte[] aid) {
        byte[] result = new byte[6 + aid.length];
        System.arraycopy(CLA_INS_P1_P2, 0, result, 0, CLA_INS_P1_P2.length);
        result[4] = (byte) aid.length;
        System.arraycopy(aid, 0, result, 5, aid.length);
        result[result.length - 1] = 0;
        Log.i("HCEReceptor", "createSelectAidApdu: " + new String(result));
        return result;
    }

    @Override
    public void onTagDiscovered(Tag tag) {
        try {
            IsoDep isoDep = IsoDep.get(tag);
            isoDep.connect();
            byte[] response;
            response = isoDep.transceive(createSelectAidApdu(AID_ANDROID));
            Log.i("HCEReceptor", "======FIRST RESPONSE======");
            Log.i("HCEReceptor", new String(response));
            while (isoDep.isConnected()) {
                response = isoDep.transceive(createSelectAidApdu(AID_ANDROID));
                Log.i("HCEReceptor", "======RESPONSE======");
                Log.i("HCEReceptor", new String(response));
                this.callback.invoke(new String(response));
                Log.i("HCEReceptor", "======CALLBACK======");
                Log.i("HCEReceptor", new String(response));
                Log.i("HCEReceptor", "======Continue======");
            }
            isoDep.close();
            nfcAdapter.disableReaderMode(getCurrentActivity());
            isoDep = null;
            nfcAdapter = null;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
