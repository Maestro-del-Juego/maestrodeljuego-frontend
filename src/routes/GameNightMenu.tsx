import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import PageviewIcon from '@mui/icons-material/Pageview';
import LoadingComponent from '../components/LoadingComponent';

interface gameNightProps {
  token: string;
  user: string;
}

interface gameNightObject {
  pk: number;
  rid: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  status: string;
  inviteesLeft: number;
  rsvps: number;
}

export default function GameNightMenu(props: gameNightProps) {
  const [gameNightList, setGameNightList] = useState<gameNightObject[]>([]);
  const [showPast, setShowPast] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [upcomingExpanded, setUpcomingExpanded] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.token !== '') {
      const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/`;
      axios
        .get(gameNightUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${props.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setGameNightList(response.data);
          const gameNightArray: Array<gameNightObject> = [];
          response.data.forEach((entry: any) => {
            const entryObject: gameNightObject = {
              pk: entry.pk,
              rid: entry.rid,
              date: entry.date,
              start_time: entry.start_time,
              end_time: entry.end_time,
              location: entry.location,
              status: entry.status,
              inviteesLeft: entry.invitees.length,
              rsvps: entry.rsvps.length,
            };
            gameNightArray.push(entryObject);
          });
          gameNightArray.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
          }); //sorts array by date, newest to oldest
          setGameNightList(gameNightArray);
          setLoading(false);
        });
    }
  }, [props.token]);

  const copyToClipboard = (url: string) => {
    const copyText = url;
    navigator.clipboard.writeText(copyText);
  };

  const handleUpcomingAccordion = () => {
    setUpcomingExpanded(upcomingExpanded === true ? false : true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (props.token !== '') {
        const gameNightUrl = `https://maestrodeljuego.herokuapp.com/gamenight/`;
        axios
          .get(gameNightUrl, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${props.token}`,
            },
          })
          .then((response) => {
            console.log(response);
            setGameNightList(response.data);
            const gameNightArray: Array<gameNightObject> = [];
            response.data.forEach((entry: any) => {
              const entryObject: gameNightObject = {
                pk: entry.pk,
                rid: entry.rid,
                date: entry.date,
                start_time: entry.start_time,
                end_time: entry.end_time,
                location: entry.location,
                status: entry.status,
                inviteesLeft: entry.invitees.length,
                rsvps: entry.rsvps.length,
              };
              gameNightArray.push(entryObject);
            });
            gameNightArray.sort(function (a, b) {
              return Date.parse(b.date) - Date.parse(a.date);
            });
            setGameNightList(gameNightArray);
          });
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [props.token]);

  return (
    <>
      {props.token !== '' ? (
        <div className="game-night-menu-container">
          <Link className="new-event-link" to="/createevent/">
            <Button size="large" sx={{ marginTop: 6, marginBottom: 4, backgroundColor:"#334195" }} variant="contained">
              Create New Event
            </Button>
          </Link>
          <div className="game-night-menu-accordions">
            <Accordion
              expanded={upcomingExpanded}
              sx={{ maxWidth: 600 }}
              onChange={handleUpcomingAccordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="upcoming-game-nights-content"
                id="upcoming-game-nights-header"
              >
                <Typography variant="h5" sx={{ fontFamily:"Raleway" }}>Upcoming Game Nights</Typography>
              </AccordionSummary>
              {loading ? (
                <AccordionDetails>
                  <LoadingComponent loadingWidth={400} loadingPadding="0px" />
                </AccordionDetails>
              ) : (
                <AccordionDetails>
                  <List>
                    {gameNightList.map((event) => (
                      <React.Fragment key={`upcoming-${event.pk}`}>
                        {moment(event.date).isBefore(moment(), 'day') ===
                          false && event.status !== 'Cancelled' ? (
                          <>
                            <Divider />
                            <ListItem
                              secondaryAction={
                                <>
                                  <Link
                                    to={`/game_night/${event.rid}/finalize`}
                                  >
                                    <Tooltip title="Edit event details">
                                      <IconButton sx={{ color:"#334195" }}>
                                        <EditIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Link>
                                  <Tooltip title="Copy event link to clipboard">
                                    <IconButton
                                      sx={{ color:"#334195" }}
                                      onClick={() =>
                                        copyToClipboard(
                                          `${window.location.href.replace(/\/+$/, '')}/${event.rid}`
                                        )
                                      }
                                    >
                                      <ContentPasteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              }
                            >
                              <ListItemAvatar>
                                {event.status === 'Finalized' ? (
                                  <Avatar sx={{ bgcolor: 'mediumseagreen' }}>
                                    <CheckCircleIcon />
                                  </Avatar>
                                ) : (
                                  <Avatar sx={{ bgcolor: 'gold' }}>
                                    <PendingIcon />
                                  </Avatar>
                                )}
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${moment(event.date).format(
                                  'MMM DD, YYYY'
                                )} @ ${event.location}`}
                                secondary={`${moment(
                                  event.start_time,
                                  'HH.mm.ss'
                                ).format('h:mm A')} - ${moment(
                                  event.end_time,
                                  'HH.mm.ss'
                                ).format('h:mm A')}; ${event.rsvps}/${
                                  event.rsvps + event.inviteesLeft
                                } RSVP'd`}
                              />
                            </ListItem>
                          </>
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </AccordionDetails>
              )}
            </Accordion>

            <Accordion sx={{ maxWidth: 600 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="past-game-nights-content"
                id="past-game-nights-header"
              >
                <Typography variant="h5" sx={{ fontFamily:"Raleway" }}>Past Game Nights</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {gameNightList.map((event) => (
                    <React.Fragment key={`past-${event.pk}`}>
                      {moment(event.date).isBefore(moment(), "day") &&
                      event.status !== 'Cancelled' ? (
                        <>
                          <Divider />
                          <ListItem
                            secondaryAction={
                              <>
                                <Link to={`/game_night/${event.rid}/finalize`}>
                                  <Tooltip title="View event details">
                                    <IconButton sx={{ color:"#334195" }}>
                                      <PageviewIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Link>
                                <Tooltip title="Copy feedback link to clipboard">
                                  <IconButton
                                    sx={{ color:"#334195" }}
                                    onClick={() =>
                                      copyToClipboard(
                                        `${window.location.href}${event.rid}/feedback`
                                      )
                                    }
                                  >
                                    <ContentPasteIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: '#759EB8' }}>
                                <EventAvailableIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${moment(event.date).format(
                                'MMM DD, YYYY'
                              )} @ ${event.location}`}
                              secondary={`${moment(
                                event.start_time,
                                'HH.mm.ss'
                              ).format('h:mm A')} - ${moment(
                                event.end_time,
                                'HH.mm.ss'
                              ).format('h:mm A')}`}
                            />
                          </ListItem>
                        </>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ maxWidth: 600 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="cancelled-game-nights-content"
                id="cancelled-game-nights-header"
              >
                <Typography variant="h5" sx={{ fontFamily:"Raleway" }}>Cancelled Game Nights</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {gameNightList.map((event) => (
                    <React.Fragment key={`cancelled-${event.pk}`}>
                      {event.status === 'Cancelled' ? (
                        <>
                          <Divider />
                          <ListItem
                            secondaryAction={
                              <Link to={`/game_night/${event.rid}/finalize`}>
                                <Tooltip title="View event details">
                                  <IconButton sx={{ color:"#334195" }}>
                                    <PageviewIcon />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'crimson' }}>
                                <CancelIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${moment(event.date).format(
                                'MMM DD, YYYY'
                              )} @ ${event.location}`}
                              secondary={`${moment(
                                event.start_time,
                                'HH.mm.ss'
                              ).format('h:mm A')} - ${moment(
                                event.end_time,
                                'HH.mm.ss'
                              ).format('h:mm A')}`}
                            />
                          </ListItem>
                        </>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* <List
                sx={{ maxWidth: 500}}
                subheader={<ListSubheader>Upcoming Game Nights</ListSubheader>}
            >
            {gameNightList.map((event) => (
                <React.Fragment key={`upcoming-${event.pk}`}>
                {(moment(event.date).isBefore(moment()) === false && event.status !== "Cancelled") ? (
                    <>
                        <Divider />
                        <ListItem
                            secondaryAction={<><Link to={`/game_night/${event.rid}/finalize`}><IconButton><EditIcon /></IconButton></Link>
                                <IconButton onClick={() => copyToClipboard(`${window.location.href}/${event.rid}`)}><ContentPasteIcon /></IconButton></>}
                        >
                            <ListItemAvatar>
                                {event.status==="Finalized" ? (
                                    <Avatar sx={{bgcolor:"mediumseagreen"}}><CheckCircleIcon /></Avatar>
                                ) : (
                                    <Avatar sx={{bgcolor:"gold"}}><PendingIcon /></Avatar>
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${moment(event.date).format('MMM DD, YYYY')} @ ${event.location}`}
                                secondary={`${moment(event.start_time, "HH.mm.ss").format("h:mm A")} - ${moment(event.end_time, "HH.mm.ss").format("h:mm A")}`}    
                            />
                        </ListItem>                       
                    </>) :(<></>)
                }
                </React.Fragment>
            ))}
            </List>
            
            <List
                sx={{ maxWidth: 500}}
                subheader={<>{showPast===false ? (
                    <ListSubheader>Past Game Nights <Button onClick={() => setShowPast(true)}>Show</Button></ListSubheader>
                    ) : (
                        <ListSubheader>Past Game Nights <Button onClick={() => setShowPast(false)}>Hide</Button></ListSubheader>
                    )}</>}
            >
            {gameNightList.map((event) => (
                <React.Fragment key={`past-${event.pk}`}>
                {(moment(event.date).isBefore(moment()) && event.status !== "Cancelled" && showPast===true) ? (
                    <>
                        <Divider />
                        <ListItem
                            secondaryAction={<Link to={`/game_night/${event.rid}/finalize`}><IconButton><EditIcon /></IconButton></Link>}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor:"dodgerblue"}}><EventAvailableIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${moment(event.date).format('MMM DD, YYYY')} @ ${event.location}`}
                                secondary={`${moment(event.start_time, "HH.mm.ss").format("h:mm A")} - ${moment(event.end_time, "HH.mm.ss").format("h:mm A")}`}    
                            />
                        </ListItem>                       
                    </>) :(<></>)
                }
                </React.Fragment>
            ))}
            </List>

            <List
                sx={{ maxWidth: 500}}
                subheader={<>{showCancelled===false ? (
                    <ListSubheader>Cancelled Game Nights <IconButton onClick={() => setShowCancelled(true)}><VisibilityIcon /></IconButton></ListSubheader>
                    ) : (
                        <ListSubheader>Cancelled Game Nights <IconButton onClick={() => setShowCancelled(false)}><VisibilityOffIcon /></IconButton></ListSubheader>
                    )}</>}
            >
            {gameNightList.map((event) => (
                <React.Fragment key={`cancelled-${event.pk}`}>
                {event.status === "Cancelled" && showCancelled===true ? (
                    <>
                        <Divider />
                        <ListItem
                            secondaryAction={<Link to={`/game_night/${event.rid}/finalize`}><IconButton><EditIcon /></IconButton></Link>}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor:"crimson"}}><CancelIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${moment(event.date).format('MMM DD, YYYY')} @ ${event.location}`}
                                secondary={`${moment(event.start_time, "HH.mm.ss").format("h:mm A")} - ${moment(event.end_time, "HH.mm.ss").format("h:mm A")}`}    
                            />
                        </ListItem>                       
                    </>) :(<></>)
                }
                </React.Fragment>
            ))}
            </List> */}
        </div>
      ) : (
        <>
          <h4>Please log in to see your game night events.</h4>
        </>
      )}
    </>
  );
}
