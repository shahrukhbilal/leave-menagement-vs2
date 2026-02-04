import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Badge,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

const LeaveRequests = () => {
  // Holds all leave requests fetched from backend
  const [leaves, setLeaves] = useState([]);

  // Holds leaves after applying search & status filters
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  // Search input value (Employee ID / Reason)
  const [searchTerm, setSearchTerm] = useState('');

  // Selected status filter (Pending / Approved / Rejected)
  const [statusFilter, setStatusFilter] = useState('');

  // Loading state while fetching data
  const [loading, setLoading] = useState(true);

  // Error message if API request fails
  const [error, setError] = useState('');

  // ----------------------------------
  // Fetch all leave requests on mount
  // ----------------------------------
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/leaves');

        if (!res.ok) throw new Error('Failed to fetch leaves');

        const data = await res.json();

        // Store original and filtered data
        setLeaves(data);
        setFilteredLeaves(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Stop loader once request completes
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  // ----------------------------------
  // Apply search & status filters
  // ----------------------------------
  useEffect(() => {
    let updated = [...leaves];

    // Filter by leave status
    if (statusFilter) {
      updated = updated.filter(
        (leave) => leave.status === statusFilter
      );
    }

    // Filter by employee ID or leave reason
    if (searchTerm) {
      updated = updated.filter(
        (leave) =>
          leave.userId
            .toString()
            .includes(searchTerm.toLowerCase()) ||
          leave.reason
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeaves(updated);
  }, [searchTerm, statusFilter, leaves]);

  // ----------------------------------
  // Update leave status (Approve / Reject)
  // ----------------------------------
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/leaves/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        // Update UI immediately after successful response
        const updated = leaves.map((leave) =>
          leave._id === id
            ? { ...leave, status: newStatus }
            : leave
        );

        setLeaves(updated);
      } else {
        alert('Status update failed');
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">
        📄 Admin: Manage Leave Requests
      </h3>

      {/* Search & Filter section */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>
                Search by Employee ID or Reason
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 1001 or sick"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Recommended</option>
                <option value="Rejected">Not Recommended</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Loader / Error / Data Table */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <div className="table-responsive shadow p-3 bg-white rounded">
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Employee ID</th>
                <th>Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{leave.userId}</td>
                    <td>{leave.reason}</td>
                    <td>
                      {new Date(
                        leave.fromDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(
                        leave.toDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {/* Status badge with dynamic color */}
                      <Badge
                        bg={
                          leave.status === 'Approved'
                            ? 'success'
                            : leave.status === 'Pending'
                            ? 'warning'
                            : 'danger'
                        }
                        text={
                          leave.status === 'Pending'
                            ? 'dark'
                            : 'light'
                        }
                      >
                        {leave.status}
                      </Badge>
                    </td>
                    <td>
                      {/* Show action buttons only for pending leaves */}
                      {leave.status === 'Pending' ? (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            className="me-2"
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id,
                                'Approved'
                              )
                            }
                          >
                            Recommend
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id,
                                'Rejected'
                              )
                            }
                          >
                            Not Recommend
                          </Button>
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No matching leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default LeaveRequests;
