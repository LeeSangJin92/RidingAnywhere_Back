package com.lec.sping.service;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
public class EmailService{

    @Autowired
    JavaMailSender emailsender;

    private String ePw;

    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException{
        System.out.println("메일 생성"+ emailsender);
        MimeMessage message = emailsender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, to);    // 보내는 대상
        message.setSubject("Riding Anywhere의 회원가입 이메일 인증"); // 메일 제목

        String msgg = "";
        msgg += "<div>";
        msgg += "<h1>안녕하세요.</h1>";
        msgg += "<h1>Riding Anywhere의 관리자입니다.</h1>";
        msgg += "<br>";
        msgg += "<p> 아래 코드를 회원가입 페이지의 인증 번호 칸에 입력해주세요!</p>";
        msgg += "<br>";
        msgg += "<h3>회원가입 인증 코드입니다.</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "Code : <strong>";
        msgg += ePw + "</strong><div><br/>";
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");
        message.setFrom(new InternetAddress("RidingAnywherw@gmail.com","RA_Admin"));

        return message;
    }

    // 8자리 숫자 키 제작
    public String createKey(){
        Random rnd = new Random();
        return rnd.nextInt(90000000)+10000000+"";
    }

    public String sendSimpleMessage(String to) throws Exception {
        ePw = createKey();
        System.out.println("발송되는 메일 : "+ to);
        MimeMessage message = createMessage(to);
        try {
            emailsender.send(message);
        } catch (MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw; // 메일로 보냈던 인증 코드를 서버로 반환
    }
}