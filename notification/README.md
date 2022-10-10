# 새로운 pApp의 알림 추가 시


1. 다른 pApp의 알림 이벤트 키 mapping 스프레드 시트를 복사하여 추가된 pApp의 구글 스프레드 시트를 생성
    > 스프레드 시트 자체 내에서의 검증 필요
  * `rel_core` 시트 내에 알림 코어 시트로부터 전달받은 헤더가 제대로 표시되는지 (특히 컬럼 갯수)
  * `이벤트 메세지 키` 시트에서 `rel_core`시트에서 지정한 바에 따라 컬럼이 제대로 박혀 있는지
  * `config` 시트의 pApp Code가 제대로 박혀있는지


2. 해당 스프레드 시트의 Apps Script를 생성 후 Script ID 복사 (URL)

3. terminal에서 `clone.sh` 실행

      3.1. 추가할 pApp 코드 입력
      ```
      pApp 코드를 입력해주세요 :
      YOUR_P_APP_CODE
      ```
      > 이미 존재하는 pApp 폴더가 없으면 입력한 pApp코드명의 이름으로 새 폴더가 생성합니다.

      3.2. 스크립트 ID 입력
      ```
      스크립트 ID를 입력해주세요. :
      YOUR_SCRIPT_ID
      ```
      > 복사한 Script ID를 붙여넣습니다.
  

4. 코어 스프레드 시트 수정
      4.1. 숨김 처리된 pApp 시트 하나 복사
      4.2. 그 시트의 gid가 곧 `c_targetSheet`의 id (추후 `5.`항목에서 사용)
      4.3. 코어 map sheet 수식 추가 (`'P_APP_CODE'!A2:Z` 추가)


5. `1.Core.js` 파일 내 다음 부분 체크

    > 알림Core 시트의 값을 제대로 참조하고 있는지 확인합니다.
  * `c_sa` : 코어 스프레드 시트 URL
  * `c_targetSheet` : 코어 스프레드 시트 중 map 시트의 URL ID (위 `4.2.` 참고)
  * `c_configSheet` : 코어 스프레드 시트 중 config 시트의 URL ID
  * `c_colCount` : 코어 스프레드 시트의 config 시트 중 컬럼 갯수 참조 셀 위치

6. `2.Global.js` 파일 내 다음 부분 체크 

    > 추가한 pApp 구글 스프레드 시트의 값을 제대로 참조하도록 값을 변경합니다.
  * `mapSheet` : 추가한 구글 스프레드 시트의 이벤트 메세지 키 시트 URL ID로 변경
  * `configSheet` : 추가한 구글 스프레드 시트의 config 시트 URL ID로 변경

7. `clasp push` 실행 (변경사항 반영)

-------------------

