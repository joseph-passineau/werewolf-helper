import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useCountdown } from "usehooks-ts";
import prettyMilliseconds from "pretty-ms";
import { useEffect, useState } from "react";

interface Props {
    title: string
    seconds: number,
    onCompleted: () => void;
}

export const CountdownTimer = (props: Props) => {

    const [isStarted, setIsStarted] = useState(false);
    const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: props.seconds,
      intervalMs: 1000,
    })

    const onStartPauseClicked = () => {
        isStarted ? stopCountdown() : startCountdown();
        setIsStarted(!isStarted);
    }

    const onStopClicked = () => {
        resetCountdown();
        setIsStarted(false);
    }

    useEffect(() => {
        if (count <= 0) {
            resetCountdown();
            setIsStarted(false);
            props.onCompleted();
        }
      }, [count, props, resetCountdown]);

    return (
      <Card>
        <Stack p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack>
                    <Typography variant="h6">{props.title}</Typography>
                    <Typography>{prettyMilliseconds(count*1000)}</Typography>
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                    <IconButton onClick={onStartPauseClicked}>
                        {isStarted ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
                    </IconButton>
                    <Box>
                        <IconButton onClick={onStopClicked}>
                            <StopIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </Stack>
        </Stack> 
      </Card>
    );
  }