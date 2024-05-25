package com.lec.sping.domain.crew;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lec.sping.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Persistent;

import java.time.DateTimeException;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CrewBoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "comment_context", nullable = false)
    private String commentContext;

    @Column(name = "comment_regdate")
    private LocalDateTime commentRegDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "comment_writer")
    private User commentWriter;

    @ManyToOne(optional = false)
    @JsonIgnore
    @ToString.Exclude
    @JoinColumn(name = "comment_board")
    private CrewBoard commentBoard;

    @ManyToOne
    @JoinColumn(name = "comment_reply")
    private CrewBoardComment commentReply;

    @PrePersist
    public void setRegDate(){
        commentRegDate = LocalDateTime.now();
    }

}
