import 'package:ads4/screens/chat_screen.dart';
import 'package:flutter/material.dart';
import 'package:ads4/components/rounded_button.dart';
import 'welcome_screen.dart';
import 'package:ads4/constants.dart';
import 'package:firebase_auth/firebase_auth.dart';

class RegistrationScreen extends StatefulWidget {
  static const String id = 'registration_screen';
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _auth = FirebaseAuth.instance;

  String email;
  String pass;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
        body: Padding(
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
                title: 'Register',
                color: Colors.blueAccent,
                onPressed: () async{
              // Navigator.pushNamed(context, WelcomeScreen.id);
              // print(email);
              // print(pass);
              try {
                final newUser = await _auth.createUserWithEmailAndPassword(
                    email: email, password: pass);
                if (newUser != null)
                  {
                    Navigator.pushNamed(context, ChatScreen.id);
                  }
              }catch(e){
                print(e);
              }
            },),
          ],
        ),
      ),
    );
  }
}