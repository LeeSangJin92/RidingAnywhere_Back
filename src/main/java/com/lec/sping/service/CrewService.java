package com.lec.sping.service;

import com.lec.sping.domain.Address;
import com.lec.sping.domain.Auth;
import com.lec.sping.domain.User;
import com.lec.sping.domain.crew.Crew;
import com.lec.sping.domain.crew.CrewBoard;
import com.lec.sping.domain.crew.CrewManager;
import com.lec.sping.dto.ChangeCrewDto;
import com.lec.sping.dto.CreateCrewDto;
import com.lec.sping.dto.CrewBoardDto;
import com.lec.sping.dto.JoinAcceptDto;
import com.lec.sping.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CrewService {

    private final CrewRepository crewRepository;
    private final AddressRepository addressRepository;
    private final CrewManagerRepository crewManagerRepository;
    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final CrewBoardRepository crewBoardRepository;

    public Crew createCrew(User crewMaster, CreateCrewDto crewDto){
        Address address = addressRepository.findByCityAndTown(crewDto.getCrew_city(), crewDto.getCrew_town()).orElseThrow(()->new RuntimeException("❌존재 하지 않는 지역입니다."));
        Crew newCrew = new Crew();
        newCrew.setCrew_name(crewDto.getCrew_name());
        newCrew.setCrew_location(address);
        newCrew.setCrew_context(crewDto.getCrew_context());
        newCrew.setUser(crewMaster);
        System.out.println(newCrew);
        return crewRepository.save(newCrew);
    }

    public void defaultCrewSet(Crew crew){
        System.out.println("🛠️ 크루 매니저 초기화 작업중...");
        CrewManager crewManager = new CrewManager();
        crewManager.setCrew(crew);
        crewManager.setUser(crew.getUser());
        crewManager.setCrew_state("CrewMaster");
        crewManagerRepository.save(crewManager);
        System.out.println("✅ 크루 매니저 초기화 완료");
        System.out.println("🛠️ 크루 테이블 매니저 데이터 입력 중...");
        crew.setCrewmanager(crewManagerRepository.findAllByCrew(crew));
        crewRepository.save(crew);
        System.out.println("✅ 크루 테이블 매니저 데이터 입력 완료");
        System.out.println("🛠️ 크루 마스터 권한 변경 중...");
        User master = crew.getUser();
        master.setAuthorityId(authorityRepository.findByAuthorityName(Auth.ROLE_CREW_Master).orElseThrow(()->new NullPointerException("❌ 존재 하지 않은 권한입니다.")));
        userRepository.save(master);
        System.out.println("✅ 크루 마스터 권한 변경 완료");
        System.out.println("✅크루 초기화 완료");
    }

    public Crew findById(Long crewId) {
        return crewRepository.findById(crewId).orElseThrow(()->new NullPointerException("❌ 존재 하지 않은 크루입니다."));
    }


    public List<CrewManager> getCrewMember(Long crewId) {
        Crew findCrew = crewRepository.findById(crewId).orElseThrow(()->new NullPointerException("❌ 존재 하지 않는 크루입니다."));
        return crewManagerRepository.findAllByCrew(findCrew);
    }

    public Crew updateLoction(ChangeCrewDto changeCrewDto, Address address){
        Crew crew = crewRepository.findById(changeCrewDto.getCrew_id()).orElseThrow(()->new NullPointerException("❌ 존재 하지 않는 라이더입니다."));
        crew.setCrew_location(address);
        System.out.println(crew);
        return crewRepository.save(crew);
    }

    public Crew save(Crew crew){
        return crewRepository.save(crew);
    }

    public List<Crew> findAllCrew() {return crewRepository.findAll();}

    public void requestJoinCrew(Long joinCrewId, String joinUserEmail) {
        System.out.println("🔎 가입하려는 크루 조회중...");
        Crew joinCrew = crewRepository.findById(joinCrewId).orElseThrow(()->new NullPointerException("❌ 존재하지 않는 크루 입니다."));
        System.out.println("✅ 크루 조회 완료");
        System.out.println("🔎 가입하려는 라이더 조회중...");
        User joinUser = userRepository.findByUserEmail(joinUserEmail).orElseThrow(()->new NullPointerException("❌ 존재하지 않는 유저 입니다."));
        System.out.println("✅ 라이더 조회 완료");
        System.out.println("🛠️ 가입 신청 진행중...");
        joinUser.setCrew(joinCrew);
        userRepository.save(joinUser);
        CrewManager addCrewManger = new CrewManager();
        addCrewManger.setCrew(joinCrew);
        addCrewManger.setUser(joinUser);
        addCrewManger.setCrew_state("CrewJoiner");
        crewManagerRepository.save(addCrewManger);
        joinCrew.setCrew_count(joinCrew.getCrew_count()+1);
        crewRepository.save(joinCrew);
        System.out.println("✅ 가입 신청 작업 완료");
    }

    public void requestJoinAccept(JoinAcceptDto joinAcceptDto) {
        System.out.println("🛠️ 크루 가입 수락 작업중...");
        User joinMember = userRepository.findById(joinAcceptDto.getJoinUserId()).orElseThrow(()->new NullPointerException("❌ 존재하지 않는 라이더입니다."));
        Crew crew = crewRepository.findById(joinAcceptDto.getCrewId()).orElseThrow(()->new NullPointerException("❌ 존재하지 않는 크루입니다."));
        joinMember.setAuthorityId(authorityRepository.findByAuthorityName(Auth.ROLE_CREW_Member).orElseThrow(()->new NullPointerException("❌ 존재 하지 않은 권한입니다.")));
        userRepository.save(joinMember);
        CrewManager crewManager = crewManagerRepository.findByCrewAndAndUser(crew,joinMember);
        crewManager.setCrew_state("CrewMember");
        crewManagerRepository.save(crewManager);
        System.out.println("✅ 크루 가입 수락 완료");
    }

    public void requestJoinRefuse(JoinAcceptDto joinAcceptDto) {
        System.out.println("🛠️ 크루 가입 거절 작업중...");
        User joinMember = userRepository.findById(joinAcceptDto.getJoinUserId()).orElseThrow(()->new NullPointerException("❌ 존재하지 않는 라이더입니다."));
        Crew crew = crewRepository.findById(joinAcceptDto.getCrewId()).orElseThrow(()->new NullPointerException("❌ 존재하지 않는 크루입니다."));
        CrewManager crewManager = crewManagerRepository.findByCrewAndAndUser(crew,joinMember);
        joinMember.setCrew(null);
        userRepository.save(joinMember);
        crewManagerRepository.delete(crewManager);
        crew.setCrew_count(crew.getCrew_count()-1);
        crewRepository.save(crew);
        System.out.println("✅ 크루 가입 거절 완료");
    }

    public void writeBoard(CrewBoardDto crewBoardDto,String boardWriterEmail ) {
        System.out.println("🛠️ 크루 게시판 작성 작업중...");
        User writer = userRepository.findByUserEmail(boardWriterEmail).orElseThrow(()->new NullPointerException("존재하지 않은 유저입니다."));
        CrewBoard crewBoard = new CrewBoard();
        crewBoard.setWriter(writer);
        crewBoard.setBoardContext(crewBoardDto.getBoardContext());
        crewBoard.setBoardTitle(crewBoardDto.getBoardTitle());
        crewBoard.setAddress(crewBoardDto.getAddress());
        crewBoard.setStartDate(crewBoardDto.getStartDate());
        crewBoard.setEndDate(crewBoardDto.getEndDate());
        crewBoard.setEmergencyNote(crewBoardDto.getEmergencyNote());
        crewBoard.setMemberCount(crewBoardDto.getMemberCount());
        crewBoard.setBoardType(crewBoardDto.getBoardType());
        crewBoardRepository.save(crewBoard);
    }
}
