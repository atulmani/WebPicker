import 'package:ads4/screens/chat_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:ads4/components/rounded_button.dart';
import 'welcome_screen.dart';
import 'package:ads4/constants.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';

class LoginScreen extends StatefulWidget {
  static const String id = 'login_screen';
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {

  final _auth = FirebaseAuth.instance;
  bool showSpinner = false;
  String email;
  String pass;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      body: ModalProgressHUD(
        inAsyncCall: showSpinner,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Hero(
                tag: 'logo',
                child: Container(
                  height: 200.0,
                  child: Image.asset('images/logo.png'),
                ),
              ),
              SizedBox(
                height: 48.0,
              ),
              TextField(
                textAlign: TextAlign.center,
                keyboardType: TextInputType.emailAddress,
                onChanged: (value) {
                  //Do something with the user input.
                  email = value.trim();
                },
                style: TextStyle(color:Colors.black),
                decoration: kTextFieldDecoration.copyWith(hintText: 'Enter your email'),
              ),
              SizedBox(
                height: 8.0,
              ),
              TextField(
                obscureText: true,
                textAlign: TextAlign.center,
                onChanged: (value) {
                  //Do something with the user input.
                  pass = value.trim();
                },
                style: TextStyle(color:Colors.black),
                decoration: kTextFieldDecoration.copyWith(hintText: 'Enter your password'),
              ),
              SizedBox(
                height: 24.0,
              ),
              MyRoundedButton(
                title: 'Log-in',
                color: Colors.lightBlueAccent,
                onPressed: () async
                {
                  setState(() {
                    showSpinner = true;
                  });

                  // Navigator.pushNamed(context, WelcomeScreen.id);
                  try {

                    final newUser = await _auth.signInWithEmailAndPassword(email: email, password: pass);
                    if (newUser != null)
                    {
                      Navigator.pushNamed(context, ChatScreen.id);
                    }
                    setState(() {
                      showSpinner = false;
                    });
                  }catch(e){
                    setState(() {
                      showSpinner = false;
                    });
                    print(e);
                  }
                },),
            ],
          ),
        ),
      ),
    );
  }
}