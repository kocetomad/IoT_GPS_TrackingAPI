package com.example.alexa.diplomna;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import android.widget.EditText;
import android.widget.Toast;

import java.io.Console;


public class Diplomna extends AppCompatActivity {
    private WebView webView;
    private TextView text;
    private EditText editText;
    public String SERVER;
    private WebAppInterface1 webinterface;
    private android.support.design.widget.TabLayout tabLayout;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diplomna);
    }



    public void openwebview(View view){


        ViewGroup parentView = (ViewGroup) view.getParent();
        parentView.removeView(view);

        text=findViewById(R.id.textView);
        text.setVisibility(View.GONE);

        editText=findViewById(R.id.editText);
        editText.setVisibility(View.GONE);

        webView=(WebView) findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        SERVER=editText.getText().toString();
        webinterface=new WebAppInterface1(this);
        webView.addJavascriptInterface(webinterface,"Android");
        webView.loadUrl(SERVER);

    }

    public void sendMessage(View view)
    {
        Intent intent = new Intent(Diplomna.this, TabFragment1.class);
        startActivity(intent);
    }

    public class WebAppInterface1{
        Context mContext;


        WebAppInterface1(Context c) {
            mContext = c;
        }


        @JavascriptInterface
        public void anchorMode() {
            new Handler(Looper.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    Log.d("UI thread", "I am the UI thread");

                    tabLayout=findViewById(R.id.TabLayouts);

                    tabLayout.setVisibility(View.VISIBLE);
                }
            });

        }
    }


}




