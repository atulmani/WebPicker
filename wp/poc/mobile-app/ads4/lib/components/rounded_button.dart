import 'package:flutter/material.dart';

class MyRoundedButton extends StatelessWidget {

  final String title;
  final Color color;
  final Function onPressed;

  MyRoundedButton({this.title, this.color, @required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: Material(
        elevation: 5.0,
        color: color,
        borderRadius: BorderRadius.circular(30.0),
        child: MaterialButton(
          onPressed: onPressed,
          // () {
          //Go to login screen.
          // Navigator.pushNamed(context, LoginScreen.id);
          // },
          minWidth: 200.0,
          height: 42.0,
          child: Text(
            title,
          ),
        ),
      ),
    );
  }
}