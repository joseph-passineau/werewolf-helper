import { Button, Container, Stack, StackProps, styled } from "@mui/material"
import useSound from 'use-sound';
import { useState } from "react";
import { SoundCard } from "./SoundCard";

import daySound from './assets/day.mp3';
import nightSound from './assets/night.mp3';
import deathSound from './assets/death.mp3';
import roosterSound from './assets/rooster.wav';
import wolfSound from './assets/wolf.wav';
import bellSound from './assets/bell.wav';
import hangSound from './assets/hang.wav';
import servantBellSound from './assets/servant-bell.mp3';

import nightBackgroud from './assets/images/night_bg.png';
import dayBackgroud from './assets/images/day_bg.png';
import wolfImage from './assets/images/wolf.png';
import roosterImage from './assets/images/rooster.jpg';
import bellImage from './assets/images/bell.jpg';
import hangImage from './assets/images/hang.jpg';
import deathImage from './assets/images/death.jpg';
import { CountdownTimer } from "./CountdownTimer";

const DayTimeVolume = 0.5;
const NightTimeVolume = 0.5;
const DeathVolume = 0.3;

const StyledBackgroundStack = styled(Stack)<StackProps>(() => ({
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  transition: 'all 2s linear'
}));

export const App = () => {

  const [isNightTime, setIsNightTime] = useState(false);
  const [isBellSoundPlaying, setIsBellSoundPlaying] = useState(false);
  const [isHangSoundPlaying, setIsHangSoundPlaying] = useState(false);

  // @ts-expect-error loop missing from HookOptions type
  const [playDaySound, moreDaySound] = useSound(daySound, { volume: DayTimeVolume, interrupt: true, loop: true }); 
  // @ts-expect-error loop missing from HookOptions type
  const [playNightSound, moreNightSound] = useSound(nightSound, { volume: NightTimeVolume, interrupt: true, loop: true});
  const [playDeathSound] = useSound(deathSound, { volume: DeathVolume, interrupt: true });
  const [playRoosterSound] = useSound(roosterSound, { interrupt: true });
  const [playWolfSound] = useSound(wolfSound, { interrupt: true });
  const [playServantBellSound] = useSound(servantBellSound, { interrupt: true });
  const [playBellSound, moreBellSound] = useSound(bellSound, { interrupt: true });
  const [playHangSound, moreHangSound] = useSound(hangSound, { interrupt: true });

  const onItsNightTimeClicked = () => {
    setIsNightTime(true);
    playNightSound();
    moreNightSound.sound.fade(0,NightTimeVolume,1000);
    moreDaySound.sound.fade(DayTimeVolume,0,1000);
  }

  const onWolfClicked = () => {
    playWolfSound();
  }

  const onItsDayTimeClicked = () => {
    setIsNightTime(false);
    playDaySound();
    moreDaySound.sound.fade(0,DayTimeVolume,1000);
    moreNightSound.sound.fade(NightTimeVolume,0,1000);
  }

  const onDeathClicked = () => {
    playDeathSound();
  }

  const onRoosterClicked = () => {
    playRoosterSound();
  }

  const onBellClicked = () => {
    if(isBellSoundPlaying) {
      moreBellSound.sound.fade(1,0,1000);
    }
    else {
      playBellSound()
      moreBellSound.sound.fade(0,1,1000);  
    }
    setIsBellSoundPlaying(!isBellSoundPlaying);
  }

  const onHangClicked = () => {
    if(isHangSoundPlaying) {
      moreHangSound.sound.fade(1,0,1000);
    }
    else {
      playHangSound()
      moreHangSound.sound.fade(0,1,1000);  
    }
    setIsHangSoundPlaying(!isHangSoundPlaying);
  }

  const backgroundImage = isNightTime ? nightBackgroud : dayBackgroud;

  return (
    <StyledBackgroundStack height="100%" style={{backgroundImage: `url(${backgroundImage})`}}>
      <Stack flexGrow={1} px={2} py={6}>
        <Container maxWidth="xs">
          <Stack>
              {isNightTime ? (
                <Button size='large' variant="contained" onClick={onItsDayTimeClicked}>It's day time</Button>
              ) : (
                <Stack gap={1}>
                  <CountdownTimer title="Debate" seconds={5*60} onCompleted={playServantBellSound} />
                  <CountdownTimer title="Defense" seconds={60} onCompleted={playServantBellSound} />
                </Stack>
              )}
          </Stack>
        </Container>
        <Stack flexGrow={1} justifyContent='center'>
          <Container maxWidth="md">     
              {isNightTime ? (
                <Stack gap={2}>
                  <SoundCard title="Wolf" description="When the wolf are out" onClick={onWolfClicked} imageSrc={wolfImage} />
                </Stack>
              ): (
                <Stack gap={2}>
                  <SoundCard title="Rooster" description="When its time to wake up" onClick={onRoosterClicked} imageSrc={roosterImage} />
                  <SoundCard title="Bell" description="When its time to vote" onClick={onBellClicked} imageSrc={bellImage} />
                  <SoundCard title="Execution" description="When executing a villager" onClick={onHangClicked} imageSrc={hangImage} />
                  <SoundCard title="Death" description="When someone has died" onClick={onDeathClicked} imageSrc={deathImage} />
                </Stack>
              )} 
          </Container>
        </Stack>
        <Container maxWidth="xs">
          <Stack>
            {!isNightTime && <Button size='large' variant="contained" onClick={onItsNightTimeClicked}>It's night time</Button>}
          </Stack>
        </Container>
      </Stack> 
    </StyledBackgroundStack>
  )
}

export default App