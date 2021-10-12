package com.practice;

interface Hello{
    void display();
}

class BYE implements Hello{
    public void display(){
        System.out.println("Hello");
    }
}

public class Interface {

    public static void main(String[] args) {

        BYE b = new BYE();
        b.display();
    }
}
