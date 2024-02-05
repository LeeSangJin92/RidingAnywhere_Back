package com.lec.sping.domain.camping;


import com.lec.sping.domain.User;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @JoinColumn(name = "campingboard")
    private CampingBoard campingboard;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;
}
