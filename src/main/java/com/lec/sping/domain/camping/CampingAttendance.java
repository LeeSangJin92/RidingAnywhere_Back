package com.lec.sping.domain.camping;


import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CampingAttendance {

    @EmbeddedId
    private CampingKey campingAttendance_id;
    private boolean campingCheckout;

    // FK 영역

    @ManyToOne
    @JoinColumn(name = "campingboard_id")
    @MapsId("campingboard_fk")
    private CampingBoard campingboard;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @MapsId("user_fk")
    private User user;
}
